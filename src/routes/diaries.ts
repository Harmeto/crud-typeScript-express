import express from 'express'
import * as diaryServices from '../services/diaryService'
import toNewDiaryEntry from '../utils/utils'

const router = express.Router()

router.get('/', (_req, res) => {
  res.send(diaryServices.getEntriesWithoutSensitiveInfo())
})

router.get('/:id', (req, res) => {
  const diary = diaryServices.findById(+req.params.id)
  return (diary != null)
    ? res.send(diary)
    : res.sendStatus(404)
})

router.post('/', (req, res) => {
  try {
    const newDiaryEntry = toNewDiaryEntry(req.body)

    const addedDiaryEntry = diaryServices.addDiary(newDiaryEntry)

    return res.json(addedDiaryEntry)
  } catch (e) {
    if (e instanceof Error) {
      return res.status(400).send(e.message)
    }
    return res.status(500).send('Internal Server Error')
  }
})

export { router }
