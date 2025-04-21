'use server'

import FormData from 'form-data'
import Mailgun from 'mailgun.js'
import { getTranslations } from 'next-intl/server'

type Props = {
  name: string
  email: string
  message: string
  locale?: string
}

export const sendContactEmail = async (data: Props) => {
  // バリデーション
  if (!data.name || !data.email || !data.message) {
    return { success: false, error: '全ての項目を入力してください' }
  }

  // ロケールの設定（デフォルトは英語）
  const locale = data.locale || 'en'

  // 翻訳を取得
  const t = await getTranslations({ locale, namespace: 'ServicesPage' })

  // Mailgunのセットアップ
  const mailgun = new Mailgun(FormData)
  const mg = mailgun.client({
    username: 'api',
    key: process.env.MAILGUN_API_KEY || ''
  })

  try {
    // 管理者への通知メール
    await mg.messages.create(process.env.MAILGUN_DOMAIN || '', {
      from: `Travel Like a Local <${process.env.FROM_EMAIL}>`,
      to: [process.env.TO_EMAIL || ''],
      subject: `新しい問い合わせ: ${data.name}様より`,
      text: `
        名前: ${data.name}
        メールアドレス: ${data.email}
        ロケール: ${locale}

        メッセージ:
        ${data.message}
      `,
      html: `
        <h2>新しい問い合わせがありました</h2>
        <p><strong>名前:</strong> ${data.name}</p>
        <p><strong>メールアドレス:</strong> ${data.email}</p>
        <p><strong>言語:</strong> ${locale}</p>
        <h3>メッセージ:</h3>
        <p>${data.message.replace(/\n/g, '<br>')}</p>
      `
    })

    // ユーザーへの自動返信メール（多言語対応）
    await mg.messages.create(process.env.MAILGUN_DOMAIN || '', {
      from: `Travel Like a Local <${process.env.FROM_EMAIL}>`,
      to: [data.email],
      subject: t('contact.autoReply.subject'),
      text: `
        ${t('contact.autoReply.greeting', { name: data.name })}

        ${t('contact.autoReply.thankYou')}

        ${t('contact.autoReply.receivedMessage')}

        ----------------------------
        ${data.message}
        ----------------------------

        ${t('contact.autoReply.willReply')}
        ${t('contact.autoReply.pleaseWait')}

        ${t('contact.autoReply.autoReplyNote')}
      `,
      html: `
        <p>${t('contact.autoReply.greeting', { name: data.name })}</p>
        <p>${t('contact.autoReply.thankYou')}</p>
        <p>${t('contact.autoReply.receivedMessage')}</p>
        <div style="background-color: #f5f5f5; padding: 15px; margin: 15px 0; border-left: 4px solid #007bff;">
          ${data.message.replace(/\n/g, '<br>')}
        </div>
        <p>${t('contact.autoReply.willReply')}<br>${t('contact.autoReply.pleaseWait')}</p>
        <p><small>${t('contact.autoReply.autoReplyNote')}</small></p>
      `
    })

    return { success: true }
  } catch (error) {
    console.error('メール送信エラー:', error)
    return {
      success: false,
      error: 'メールの送信に失敗しました。時間をおいて再度お試しください。'
    }
  }
}
