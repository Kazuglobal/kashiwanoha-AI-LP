/**
 * POST entry point: accepts JSON payload from the web form and relays an email notification.
 * Deploy this script as a Web App (Execute as: Me, Who has access: Anyone) and use the
 * deployment URL as NG_APP_GAS_WEBHOOK_URL.
 */
function doPost(e) {
  const log = (message, data) => {
    if (data !== undefined) {
      console.log(message, data);
    } else {
      console.log(message);
    }
  };

  if (!e || !e.postData || !e.postData.contents) {
    log('doPost: missing post body');
    return buildResponse(400, { ok: false, error: 'Missing request body' });
  }

  let payload;
  try {
    payload = JSON.parse(e.postData.contents);
  } catch (error) {
    log('doPost: failed to parse JSON', error);
    return buildResponse(400, { ok: false, error: 'Invalid JSON payload' });
  }

  const {
    recipient,
    name,
    furigana,
    email,
    phone,
    school_name: schoolName,
    grade,
    motivation,
    submittedAt,
    source,
  } = payload;

  if (!recipient) {
    log('doPost: missing recipient in payload', payload);
    return buildResponse(400, { ok: false, error: 'Recipient email is required.' });
  }

  const formatedSubmittedAt = submittedAt
    ? new Date(submittedAt).toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo' })
    : new Date().toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo' });

  const subject = '【ワークショップ申込み】新しい参加リクエストが届きました';
  const lines = [
    '新しい参加申し込みが届きました。内容をご確認ください。',
    '',
    `申込日時: ${formatedSubmittedAt}`,
    `受付元: ${source || 'application-form'}`,
    '',
    `氏名: ${name || '-'}`,
    `ふりがな: ${furigana || '-'}`,
    `メールアドレス: ${email || '-'}`,
    `電話番号: ${phone || '-'}`,
    `学校名: ${schoolName || '-'}`,
    `学年: ${grade || '-'}`,
    '',
    '参加動機:',
    motivation ? motivation.trim() : '（未入力）',
    '',
    '---',
    '本メールは Apps Script から自動送信されています。',
  ];

  const body = lines.join('\n');

  try {
    MailApp.sendEmail({
      to: recipient,
      subject,
      body,
      name: 'Workshop Application Bot',
    });
    log('doPost: notification sent', { recipient });
    return buildResponse(200, { ok: true });
  } catch (error) {
    log('doPost: failed to send email', error);
    return buildResponse(500, { ok: false, error: 'Failed to send email.' });
  }
}

/**
 * Builds a JSON HTTP response with permissive CORS headers so the browser call succeeds.
 */
function buildResponse(status, payload) {
  const text = JSON.stringify(payload, null, 2);
  const output = ContentService.createTextOutput(text);
  output.setMimeType(ContentService.MimeType.JSON);
  
  // Google Apps Scriptでは setHeader が利用できないため、基本的なレスポンスのみを返す
  return output;
}

/**
 * Optional: respond to CORS preflight requests.
 */
function doOptions() {
  return ContentService.createTextOutput('')
    .setMimeType(ContentService.MimeType.TEXT);
}
