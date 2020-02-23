import {
  hasNumberProperty,
  hasProperty,
  hasStringProperty
} from '~/utils/type-assert'

export interface UserInfo {
  uid?: string
  iconUrl?: string
  /** DDR-CODE(without "-") */
  ddrCode: number
  /** displayed name */
  displayName: string
  /** play area */
  area: Area
  /** user description */
  description: string
  /** if true, user score will be displayed in public */
  isPublic: boolean
}

export type Area =
  | '未設定'
  | '北海道'
  | '青森県'
  | '岩手県'
  | '宮城県'
  | '秋田県'
  | '山形県'
  | '福島県'
  | '茨城県'
  | '栃木県'
  | '群馬県'
  | '埼玉県'
  | '千葉県'
  | '東京都'
  | '神奈川県'
  | '新潟県'
  | '富山県'
  | '石川県'
  | '福井県'
  | '山梨県'
  | '長野県'
  | '岐阜県'
  | '静岡県'
  | '愛知県'
  | '三重県'
  | '滋賀県'
  | '京都府'
  | '大阪府'
  | '兵庫県'
  | '奈良県'
  | '和歌山県'
  | '鳥取県'
  | '島根県'
  | '岡山県'
  | '広島県'
  | '山口県'
  | '徳島県'
  | '香川県'
  | '愛媛県'
  | '高知県'
  | '福岡県'
  | '佐賀県'
  | '長崎県'
  | '熊本県'
  | '大分県'
  | '宮崎県'
  | '鹿児島県'
  | '沖縄県'
  | '香港'
  | '韓国'
  | '台湾'
  | 'アメリカ'
  | 'ヨーロッパ'
  | '海外'
  | 'カナダ'
  | 'シンガポール'
  | 'タイ'
  | 'オーストラリア'
  | 'ニュージーランド'
  | 'イギリス'
  | 'イタリア'
  | 'スペイン'
  | 'ドイツ'
  | 'フランス'
  | 'ポルトガル'
  | 'インドネシア'
  | 'フィリピン'

export const AreaList: Area[] = [
  '未設定',
  '北海道',
  '青森県',
  '岩手県',
  '宮城県',
  '秋田県',
  '山形県',
  '福島県',
  '茨城県',
  '栃木県',
  '群馬県',
  '埼玉県',
  '千葉県',
  '東京都',
  '神奈川県',
  '新潟県',
  '富山県',
  '石川県',
  '福井県',
  '山梨県',
  '長野県',
  '岐阜県',
  '静岡県',
  '愛知県',
  '三重県',
  '滋賀県',
  '京都府',
  '大阪府',
  '兵庫県',
  '奈良県',
  '和歌山県',
  '鳥取県',
  '島根県',
  '岡山県',
  '広島県',
  '山口県',
  '徳島県',
  '香川県',
  '愛媛県',
  '高知県',
  '福岡県',
  '佐賀県',
  '長崎県',
  '熊本県',
  '大分県',
  '宮崎県',
  '鹿児島県',
  '沖縄県',
  '香港',
  '韓国',
  '台湾',
  'アメリカ',
  'ヨーロッパ',
  '海外',
  'カナダ',
  'シンガポール',
  'タイ',
  'オーストラリア',
  'ニュージーランド',
  'イギリス',
  'イタリア',
  'スペイン',
  'ドイツ',
  'フランス',
  'ポルトガル',
  'インドネシア',
  'フィリピン'
]

export function isUser(obj: unknown): obj is UserInfo {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    !(hasProperty(obj, 'uid') && typeof obj.uid !== 'string') &&
    !(hasProperty(obj, 'iconUrl') && typeof obj.iconUrl !== 'string') &&
    hasNumberProperty(obj, 'ddrCode') &&
    hasStringProperty(obj, 'displayName') &&
    hasStringProperty(obj, 'area') &&
    (AreaList as string[]).includes(obj.area) &&
    hasStringProperty(obj, 'description') &&
    hasProperty(obj, 'isPublic') &&
    typeof obj.isPublic === 'boolean'
  )
}
