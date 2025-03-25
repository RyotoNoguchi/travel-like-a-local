export type Bookmark = {
  id?: string // MongoDBが生成する一意のID
  userId: string // NextAuthのセッションから取得されるユーザーID
  blogPostSlug: string // ContentfulのブログポストのスラッグをIDとして使用
  createdAt: Date // ブックマークが作成された日時
  updatedAt: Date // ブックマークが更新された日時
  blogPostTitle?: string // 記事のタイトル（一覧表示時に便利）
  isActive: boolean // ブックマークが有効か（論理削除用）
}
