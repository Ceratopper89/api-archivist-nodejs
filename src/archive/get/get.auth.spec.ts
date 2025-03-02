import { StatusCodes } from 'http-status-codes'

import { claimArchive, getArchives, getTokenForNewUser, invalidateToken, setArchiveAccessControl } from '../../test'

describe('/archive', () => {
  describe('with token', () => {
    let archive = ''
    let token = ''
    beforeAll(async () => {
      // Create public archive
      token = await getTokenForNewUser()
      archive = (await claimArchive(token)).archive
      await setArchiveAccessControl(token, archive, { accessControl: false, archive })
    })
    it('supplied allows access', async () => {
      await getArchives(token, StatusCodes.OK)
    })
    it('absent allows access', async () => {
      await getArchives(undefined, StatusCodes.OK)
    })
    it('invalid does not allow access', async () => {
      await getArchives(invalidateToken(token), StatusCodes.UNAUTHORIZED)
    })
  })
})
