/**
 * CORS対応強化版のGAS - 複数の方法でCORS問題を解決
 */

/**
 * POST entry point: accepts JSON payload from the web form and relays an email notification.
 */
function doPost(e) {
  console.log('=== doPost called ===');
  console.log('Event type:', typeof e);
  console.log('Event:', e);
  
  // event が undefined の場合の処理
  if (!e) {
    console.log('ERROR: Event is undefined');
    return createCorsResponse(400, { ok: false, error: 'Event is undefined' });
  }
  
  // CORS preflight request の処理
  if (e.parameter && e.parameter.method === 'OPTIONS') {
    return handleOptions();
  }
  
  if (!e.postData || !e.postData.contents) {
    console.log('ERROR: Missing post body');
    console.log('e.postData:', e.postData);
    return createCorsResponse(400, { ok: false, error: 'Missing request body' });
  }

  let payload;
  try {
    payload = JSON.parse(e.postData.contents);
    console.log('Parsed payload:', JSON.stringify(payload, null, 2));
  } catch (error) {
    console.log('ERROR: Failed to parse JSON', error);
    return createCorsResponse(400, { ok: false, error: 'Invalid JSON payload' });
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
    console.log('ERROR: Missing recipient in payload', payload);
    return createCorsResponse(400, { ok: false, error: 'Recipient email is required.' });
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
    console.log('Attempting to send email to:', recipient);
    MailApp.sendEmail({
      to: recipient,
      subject,
      body,
      name: 'Workshop Application Bot',
    });
    console.log('SUCCESS: Email sent to', recipient);
    return createCorsResponse(200, { ok: true, message: 'Email sent successfully' });
  } catch (error) {
    console.log('ERROR: Failed to send email', error);
    return createCorsResponse(500, { ok: false, error: 'Failed to send email: ' + error.toString() });
  }
}

/**
 * CORS preflight request の処理
 */
function doOptions(e) {
  console.log('=== doOptions called ===');
  return handleOptions();
}

/**
 * OPTIONS リクエストの処理
 */
function handleOptions() {
  console.log('Handling OPTIONS request');
  return createCorsResponse(200, { ok: true });
}

/**
 * CORS対応レスポンスの作成
 * Google Apps Scriptの制限を回避する複数の方法を試行
 */
function createCorsResponse(status, payload) {
  const text = JSON.stringify(payload, null, 2);
  console.log('Creating response:', text);
  
  // 方法1: 基本的なContentService
  const output = ContentService.createTextOutput(text);
  output.setMimeType(ContentService.MimeType.JSON);
  
  // 方法2: ヘッダー設定を試行（利用可能な場合）
  try {
    if (typeof output.setHeader === 'function') {
      output.setHeader('Access-Control-Allow-Origin', '*');
      output.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS, GET');
      output.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
      output.setHeader('Access-Control-Max-Age', '86400');
      console.log('Headers set successfully');
    } else {
      console.log('setHeader not available');
    }
  } catch (e) {
    console.log('Header setting failed:', e);
  }
  
  // 方法3: ステータスコード設定を試行
  try {
    if (typeof output.setResponseCode === 'function') {
      output.setResponseCode(status);
      console.log('Response code set to:', status);
    } else {
      console.log('setResponseCode not available');
    }
  } catch (e) {
    console.log('Response code setting failed:', e);
  }
  
  return output;
}

/**
 * テスト用関数
 */
function testCorsEmail() {
  const testData = {
    recipient: 'globalbunny77@gmail.com',
    name: 'CORSテスト太郎',
    furigana: 'こーすてすとたろう',
    email: 'cors-test@example.com',
    phone: '090-9999-9999',
    school_name: 'CORSテスト高校',
    grade: '高校3年生',
    motivation: 'CORS問題の解決テストです。',
    submittedAt: new Date().toISOString(),
    source: 'cors-test'
  };
  
  const mockEvent = {
    postData: {
      contents: JSON.stringify(testData)
    }
  };
  
  console.log('Testing CORS email...');
  const result = doPost(mockEvent);
  console.log('Result:', result.getContent());
  return result;
}

/**
 * 直接メール送信テスト（doPostを経由しない）
 */
function testDirectEmail() {
  try {
    console.log('Testing direct email...');
    MailApp.sendEmail({
      to: 'globalbunny77@gmail.com',
      subject: '【直接テスト】GASメール送信テスト',
      body: 'これは直接メール送信テストです。\n\n送信日時: ' + new Date().toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo' }),
      name: 'Workshop Application Bot (Direct Test)'
    });
    console.log('Direct email sent successfully');
    return 'Success';
  } catch (error) {
    console.error('Direct email failed:', error);
    return 'Failed: ' + error.toString();
  }
}

/**
 * 環境確認テスト
 */
function testEnvironment() {
  console.log('=== Environment Test ===');
  console.log('MailApp available:', typeof MailApp !== 'undefined');
  console.log('ContentService available:', typeof ContentService !== 'undefined');
  
  const output = ContentService.createTextOutput('test');
  console.log('ContentService methods:');
  console.log('- setMimeType:', typeof output.setMimeType === 'function');
  console.log('- setHeader:', typeof output.setHeader === 'function');
  console.log('- setResponseCode:', typeof output.setResponseCode === 'function');
  
  return 'Environment test completed';
}

/**
 * デバッグ用: 利用可能なメソッドを確認
 */
function checkAvailableMethods() {
  const output = ContentService.createTextOutput('test');
  const methods = [];
  
  // 利用可能なメソッドをチェック
  const methodNames = ['setHeader', 'setResponseCode', 'setMimeType', 'setContent'];
  
  methodNames.forEach(method => {
    if (typeof output[method] === 'function') {
      methods.push(method + ': available');
    } else {
      methods.push(method + ': not available');
    }
  });
  
  console.log('Available methods:', methods);
  return methods;
}
