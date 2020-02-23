import { isUser, UserInfo } from '@/types/user-info'

describe('UserInfo', () => {
  const userInfo: UserInfo = {
    displayName: 'RINON',
    ddrCode: 20000000,
    area: '未設定',
    description: '大空の足神',
    isPublic: true
  }
  test.each([undefined, null, {}, 'foo', 1.5, true])(
    'isUser returns false if obj is not object',
    (obj) => {
      expect(isUser(obj)).toBe(false)
    }
  )
  test('isUser returns false if obj is not UserInfo', () => {
    expect(isUser({ ...userInfo, uid: 10 })).toBe(false)
    expect(isUser({ ...userInfo, displayName: null })).toBe(false)
    expect(isUser({ ...userInfo, ddrCode: '1000-0000' })).toBe(false)
    expect(isUser({ ...userInfo, area: 'ユニバーヒルズ' })).toBe(false)
    expect(isUser({ ...userInfo, iconUrl: true })).toBe(false)
  })
  test('isUser returns true if obj is UserInfo', () => {
    expect(isUser(userInfo)).toBe(true)
    expect(isUser({ ...userInfo, uid: 'foo' })).toBe(true)
    expect(isUser({ ...userInfo, iconUrl: 'example.com' })).toBe(true)
  })
})
