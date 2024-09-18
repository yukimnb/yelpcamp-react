# 概要

### 題材
[Udemyの講座](https://www.udemy.com/course/the-web-developer-bootcamp-2021-japan/)で作成するWebサイトのデザインのみ使用しています。  
講座での構成はNode.js, Express, Bootstrapを用いて作成されていますが、全て書き換えReactとMUIでの構成に変更しています。

### 作成目的
- ポートフォリオの一環として
- フロントエンド（JS, React, MUI）とバックエンド（Django, DjangoRestFramework）の学習

### 作成動機
現在、Pythonのエンジニアとして働いており、Web系にも興味を持ったので、最初にPythonのWebフレームワークであるDjangoを使用し簡単なWebサイトを作成。  
ある程度作成が完了後、より難しい構成(フロントとバックエンドの分離)にチャレンジしたく、またWeb系のプロジェクトに入るためにはバックエンドだけでなく、フロントエンドの理解もあるとさらに良いと判断。  
また、Reactのフレームワーク(Next.js, Remix, etc.)はあえて使用せず、素のReactで実装。

# 使用技術
|||
|---|---|
|OS|Mac, Linux(Amazon Linux 2023)|
|エディター|Visual Studio Code|
|言語|Python, JavaScript, HTML, CSS|
|フレームワーク|Django, DjangoRestFramework, React|
|UIライブラリ|Material UI|
|Reactライブラリ|React Query, React Router, React Hook Form, React Error Boundary, React toastify|
|ホスティング|Vercel, Amazon Lightsail|
|Webサーバー|Nginx|
|APサーバー|Gunicorn|
|データベース|PostgreSQL|
|CI/CD|GitHub Actions|
|バージョン管理|Git, GitHub|
|パッケージ管理|Poetry, npm|
|ビルドツール|Vite|
|テスト|Djangoのテストフレームワーク|
|API|Mapbox API|
|React Hooks|useState, useRef, useEffect, useReducer, useContext|
|その他|Docker|

# 構成
![yelpcamp-react](https://github.com/user-attachments/assets/b856c73c-31b9-47a3-bac8-ffaf6255096c)

# 関連URL
- [ポートフォリオサイト](https://yelpcamp-react.vercel.app/)（ユーザー作成や投稿等自由に触って頂いて大丈夫です。）

- [バックエンドのソース](https://github.com/yukimnb/yelpcamp-django)

# 残対応
1. TS化
2. 無限スクロール
3. 検索機能
4. カテゴリ検索
5. TOP画面の導線を無くす
6. バックエンドのテストをpytestで置き換えて、カバレッジを上げる
