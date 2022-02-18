import { Express } from 'express'

import {
  getArchiveBlockHash,
  getArchiveBlockHashPayloads,
  getArchiveBlockRecent,
  getArchiveBlockStats,
  postArchiveBlock,
} from '../archive'
import { requireArchiveAccess } from '../middleware'
import { notImplemented } from './notImplemented'

export const addBlockRoutes = (app: Express) => {
  app.post('/archive/:archive/block', postArchiveBlock /* #swagger.tags = ['block'] */)
  app.post('/archive/:archive/bw', postArchiveBlock /* #swagger.tags = ['block'] */)
  app.get('/archive/:archive/block/stats', getArchiveBlockStats /* #swagger.tags = ['block'] */)
  app.get(
    '/archive/:archive/block/hash/:hash',
    requireArchiveAccess,
    getArchiveBlockHash
    /* #swagger.tags = ['block'] */
    /* #swagger.summary = 'Get blocks by block hash' */
  )
  app.get(
    '/archive/:archive/block/hash/:hash/payloads',
    requireArchiveAccess,
    getArchiveBlockHashPayloads
    /* #swagger.tags = ['block'] */
    /* #swagger.summary = 'Get block payloads by block hash' */
  )
  app.get(
    '/archive/:archive/block/recent/:limit?',
    requireArchiveAccess,
    getArchiveBlockRecent
    /* #swagger.tags = ['block'] */
    /* #swagger.summary = 'Get the most recent blocks' */
  )
  app.get(
    '/archive/:archive/block/sample/:size?',
    requireArchiveAccess,
    notImplemented
    /* #swagger.tags = ['block'] */
    /* #swagger.summary = 'Get a random sampling of blocks' */
  )
  app.get(
    '/archive/:archive/block/chain/:hash?',
    requireArchiveAccess,
    notImplemented
    /* #swagger.tags = ['block'] */
    /* #swagger.summary = 'Get a proof of origin chain starting from a block hash' */
  )
}
