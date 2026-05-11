# Clinic Growth OS

店舗、クリニック、サロン向けの集客KPI統合ダッシュボードMVPです。

## 現在できること

- ログイン風の入口からデモサイトを開く
- 広告費、問い合わせCPA、予約率、入金ROASの自動計算
- Google広告、Meta広告、MEO、Instagram、紹介などの媒体別比較
- 問い合わせ、予約、来院、申込CV、入金CVのファネル表示
- Googleマップ順位、口コミ、Instagram投稿、フォロワー、リーチの表示
- クライアント切替
- 数値入力による即時シミュレーション
- ローカル保存
- Dashboard / Ads / MEO / SNS / CRM / Settings のアプリ内画面切替
- 広告改善ボード、MEO順位管理、SNS投稿カレンダー、CRMパイプライン
- CSV取込モーダル、月次レポート出力導線
- サンプルCSVの取込によるダッシュボード更新
- CRMリード追加、リードカードのステージ進行
- 広告タスクの完了/未完了切替
- OEM設定と外部連携ステータスの表示

## 公開URL

RawGitHack:

```text
https://raw.githack.com/ryo60129109-gif/MBJ-AI/main/index.html
```

GitHub Pagesを有効化した場合:

```text
https://ryo60129109-gif.github.io/MBJ-AI/
```

## 触れるポイント

- 入口画面の「デモサイトを開く」から管理画面へ入る
- `CSV取込` でサンプルCSVを反映する
- `Ads` でタスクカードをクリックして完了にする
- `CRM` でリードを追加する
- `CRM` のリードカードをクリックしてステージを進める
- `Settings` でサービス名やブランドカラーを反映する

## 次に作るべき機能

1. CSVインポート実装
   Google広告、Meta広告、予約台帳、入金データをCSVで取り込む。

2. データ保存
   localStorageからSupabaseまたはPostgreSQLへ移行する。

3. クライアント管理
   店舗、ブランド、担当者、月額プラン、閲覧権限を管理する。

4. 月次レポート
   ダッシュボードの内容をPDFまたは共有URLで出力する。

5. API連携
   Google Ads、Meta Ads、Google Business Profile、Instagram、CRMを順番に自動同期する。

6. OEM化
   ロゴ、カラー、独自ドメイン、クライアント権限、代理店管理画面を追加する。

## 推奨する本番構成

- フロントエンド: Next.js
- データベース: Supabase または PostgreSQL
- 認証: Supabase Auth または Auth.js
- データ同期: Cloud Run / Vercel Cron / GitHub Actions
- BI出力: Looker Studio連携またはPDF自動生成
- 初期連携: CSV、Google Sheets、kintone、Airtable
