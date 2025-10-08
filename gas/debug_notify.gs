/**
 * デバッグ用のGAS - 詳細なログ出力
 */
function doPost(e) {
  console.log('=== doPost called ===');
  console.log('Event:', e);
  
  if (!e || !e.postData || !e.postData.contents) {
    console.log('ERROR: Missing post body');
    return ContentService.createTextOutput(JSON.stringify({ 
      ok: false, 
      error: 'Missing request body' 
    })).setMimeType(ContentService.MimeType.JSON);
  }

  let payload;
  try {
    payload = JSON.parse(e.postData.contents);
    console.log('Parsed payload:', payload);
  } catch (error) {
    console.log('ERROR: Failed to parse JSON', error);
    return ContentService.createTextOutput(JSON.stringify({ 
      ok: false, 
      error: 'Invalid JSON payload' 
    })).setMimeType(ContentService.MimeType.JSON);
  }

  const { recipient, name, email } = payload;
  console.log('Recipient:', recipient);
  console.log('Name:', name);
  console.log('Email:', email);

  if (!recipient) {
    console.log('ERROR: Missing recipient');
    return ContentService.createTextOutput(JSON.stringify({ 
      ok: false, 
      error: 'Recipient email is required.' 
    })).setMimeType(ContentService.MimeType.JSON);
  }

  try {
    console.log('Attempting to send email...');
    MailApp.sendEmail({
      to: recipient,
      subject: '【デバッグテスト】ワークショップ申込み通知',
      body: `デバッグテストメールです。\n\n申込者: ${name || '不明'}\nメール: ${email || '不明'}\n送信日時: ${new Date().toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo' })}`,
      name: 'Workshop Application Bot (Debug)'
    });
    console.log('SUCCESS: Email sent to', recipient);
    return ContentService.createTextOutput(JSON.stringify({ 
      ok: true, 
      message: 'Email sent successfully' 
    })).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    console.log('ERROR: Failed to send email', error);
    return ContentService.createTextOutput(JSON.stringify({ 
      ok: false, 
      error: 'Failed to send email: ' + error.toString() 
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

function testDebugEmail() {
  const testData = {
    recipient: 'globalbunny77@gmail.com',
    name: 'デバッグテスト太郎',
    email: 'debug@example.com'
  };
  
  const mockEvent = {
    postData: {
      contents: JSON.stringify(testData)
    }
  };
  
  console.log('Testing debug email...');
  const result = doPost(mockEvent);
  console.log('Result:', result.getContent());
}
