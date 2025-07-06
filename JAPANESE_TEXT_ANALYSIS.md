# Japanese Text Analysis for FMC Logger

This document lists all Japanese text found in the FMC Logger application with suggested English translations and translation keys for internationalization.

## Pages and Metadata

### 1. Homepage (src/app/page.tsx)

| Japanese                                                        | English                                                         | Translation Key        |
| --------------------------------------------------------------- | --------------------------------------------------------------- | ---------------------- |
| ホーム                                                          | Home                                                            | pages.home.title       |
| FMC Loggerのホームページ - 今日のスクランブルと最新の記録を確認 | FMC Logger Homepage - Check today's scramble and latest records | pages.home.description |

### 2. Root Layout (src/app/layout.tsx)

| Japanese                                                              | English                                                                                    | Translation Key            |
| --------------------------------------------------------------------- | ------------------------------------------------------------------------------------------ | -------------------------- |
| FMCerのための記録管理ツール - Fewest Move Challengeの記録と進捗を管理 | Record management tool for FMCers - Manage your Fewest Move Challenge records and progress | app.description            |
| ルービックキューブ                                                    | Rubik's Cube                                                                               | keywords.rubiks_cube       |
| スピードキューブ                                                      | Speed Cube                                                                                 | keywords.speed_cube        |
| 記録管理                                                              | Record Management                                                                          | keywords.record_management |

### 3. User ID Settings Page (src/app/user/setId/page.tsx)

| Japanese                                   | English                         | Translation Key              |
| ------------------------------------------ | ------------------------------- | ---------------------------- |
| ユーザーID設定                             | User ID Settings                | pages.user.setId.title       |
| FMC Loggerで使用するユーザーIDを設定します | Set your user ID for FMC Logger | pages.user.setId.description |

### 4. User Profile Page (src/app/user/[userid]/page.tsx)

| Japanese                                      | English                                  | Translation Key                         |
| --------------------------------------------- | ---------------------------------------- | --------------------------------------- |
| ${user.name}さんのFMC記録とソリューション一覧 | ${user.name}'s FMC records and solutions | pages.user.profile.description          |
| ユーザーが見つかりません                      | User not found                           | pages.user.profile.notFound.title       |
| 指定されたユーザーは存在しません              | The specified user does not exist        | pages.user.profile.notFound.description |

### 5. Scramble Page (src/app/scramble/[id]/page.tsx)

| Japanese                        | English                     | Translation Key            |
| ------------------------------- | --------------------------- | -------------------------- |
| スクランブル ${id}              | Scramble ${id}              | pages.scramble.title       |
| スクランブル ${id} の詳細ページ | Scramble ${id} details page | pages.scramble.description |
| スクランブルが見つかりません    | Scramble not found          | pages.scramble.notFound    |

### 6. Scramble Challenge Page (src/app/scramble/[id]/challenge/page.tsx)

| Japanese                        | English                    | Translation Key                      |
| ------------------------------- | -------------------------- | ------------------------------------ |
| チャレンジ - スクランブル ${id} | Challenge - Scramble ${id} | pages.scramble.challenge.title       |
| スクランブル ${id} にチャレンジ | Challenge Scramble ${id}   | pages.scramble.challenge.description |
| スクランブル ${id} にチャレンジ | Challenge Scramble ${id}   | pages.scramble.challenge.heading     |
| 挑戦しない                      | Skip Challenge             | pages.scramble.challenge.skipButton  |

## Components

### 7. Form Set User ID (src/components/organisms/FormSetUserId.tsx)

| Japanese                     | English                   | Translation Key                |
| ---------------------------- | ------------------------- | ------------------------------ |
| ユーザーIDを入力してください | Please enter your user ID | forms.setUserId.error.empty    |
| ユーザーID                   | User ID                   | forms.setUserId.label          |
| ユーザーIDを入力             | Enter user ID             | forms.setUserId.placeholder    |
| 送信に失敗しました           | Failed to submit          | forms.setUserId.error.submit   |
| 設定中...                    | Setting...                | forms.setUserId.button.loading |
| 設定                         | Set                       | forms.setUserId.button.submit  |

### 8. Form Input Solution (src/components/organisms/FormInputSolutionAnswer.tsx)

| Japanese                   | English                   | Translation Key                      |
| -------------------------- | ------------------------- | ------------------------------------ |
| 回転記号が正しくありません | Invalid rotation notation | forms.solution.error.invalidNotation |
| 送信に失敗しました         | Failed to submit          | forms.solution.error.submit          |
| コメント (任意)            | Comment (optional)        | forms.solution.comment.placeholder   |
| 解法を入力してください     | Enter your solution       | forms.solution.solution.placeholder  |
| 送信中...                  | Submitting...             | forms.solution.button.loading        |
| 提出                       | Submit                    | forms.solution.button.submit         |

### 9. Scramble Results Section (src/components/organisms/ScrambleResultsSection.tsx)

| Japanese                                 | English                                  | Translation Key           |
| ---------------------------------------- | ---------------------------------------- | ------------------------- |
| スクランブル                             | Scramble                                 | scramble.title            |
| このスクランブルにはまだ挑戦していません | You haven't challenged this scramble yet | scramble.notChallenged    |
| みんなの回答を表示                       | Show everyone's answers                  | scramble.showAllAnswers   |
| スクランブルを表示                       | Show scramble                            | scramble.showButton       |
| あなたの回答                             | Your answer                              | scramble.yourAnswer       |
| スコア                                   | Score                                    | scramble.score            |
| 解法                                     | Solution                                 | scramble.solution         |
| メモ                                     | Notes                                    | scramble.notes            |
| みんなの回答                             | Everyone's answers                       | scramble.everyonesAnswers |
| あなた                                   | You                                      | scramble.you              |
| 匿名                                     | Anonymous                                | scramble.anonymous        |
| メモ:                                    | Notes:                                   | scramble.notesLabel       |

### 10. Show Scramble Section (src/components/organisms/ShowScrambleSection.tsx)

| Japanese                                                 | English                                                        | Translation Key                   |
| -------------------------------------------------------- | -------------------------------------------------------------- | --------------------------------- |
| スクランブルを表示                                       | Show scramble                                                  | challenge.showScrambleButton      |
| ボタンを押すとスクランブルが表示され、挑戦を開始できます | Press the button to show the scramble and start your challenge | challenge.showScrambleInstruction |
| スクランブル                                             | Scramble                                                       | challenge.scrambleTitle           |

## Summary

- **Total Japanese text entries**: 38
- **Files containing Japanese text**: 10
- **Main categories**:
  - Page metadata (titles, descriptions)
  - Form labels and placeholders
  - Button text and loading states
  - Error messages
  - UI section headers
  - Status messages

## Translation Priority

### High Priority (User-facing UI)

- Form labels and placeholders
- Button text
- Error messages
- Section headers

### Medium Priority (SEO/Metadata)

- Page titles
- Meta descriptions
- OpenGraph data

### Low Priority (Keywords)

- Keyword arrays for SEO
- Internal references

## Next Steps

1. Install and configure next-intl for internationalization
2. Create translation files (ja.json, en.json)
3. Replace hardcoded Japanese text with translation functions
4. Add language switching functionality
5. Update metadata generation to use translations
