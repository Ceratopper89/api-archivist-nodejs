import { claimArchive, getNewBlock, getNewBlockWithBoundWitnessesWithPayloads, getPayloadByBlockHash, getTokenForNewUser, postBlock } from '../../../../../test'

describe('/archive/:archive/block/hash/:hash/payloads', () => {
  let token = ''
  let archive = ''
  beforeEach(async () => {
    token = await getTokenForNewUser()
    archive = (await claimArchive(token)).archive
  })
  it('Retrieves the single payload for the specified block hash', async () => {
    const block = getNewBlockWithBoundWitnessesWithPayloads(1, 1)
    const hash = block[0]._hash || ''
    await postBlock(block, archive)
    const response = await getPayloadByBlockHash(token, archive, hash)
    expect(response).toBeTruthy()
    expect(response.length).toBe(1)
    const payloads = response[0]
    expect(payloads).toBeTruthy()
  })
  it('Retrieves the array of payloads for the specified block hash', async () => {
    const block = getNewBlockWithBoundWitnessesWithPayloads(1, 2)
    const hash = block[0]._hash || ''
    await postBlock(block, archive)
    const response = await getPayloadByBlockHash(token, archive, hash)
    expect(response).toBeTruthy()
    expect(response.length).toBe(2)
    const received = response[0]
    expect(received).toBeTruthy()
  })
  it('Returns an empty array if no payload was posted for the specified block hash', async () => {
    const block = getNewBlock()
    const hash = block._hash || ''
    await postBlock(block, archive)
    const response = await getPayloadByBlockHash(token, archive, hash)
    expect(response).toBeTruthy()
    expect(response.length).toBe(0)
  })
})
