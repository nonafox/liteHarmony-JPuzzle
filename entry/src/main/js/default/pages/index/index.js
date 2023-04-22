import {
    dictionary as BUFF_IDAO_DICTIONARY_RAW,
    splitter as BUFF_IDAO_SPLITTER
} from './buff/idao'
const BUFF_IDAO_DICTIONARY = BUFF_IDAO_DICTIONARY_RAW
    .split(BUFF_IDAO_SPLITTER)
import {
    library as BUFF_GUSHI_LIBRARY,
    splitter as BUFF_GUSHI_SPLITTER
} from './buff/gushi'
import {
    library as BUFF_QUNDAO_LIBRARY,
    stops as BUFF_QUNDAO_STOPS,
    splitter as BUFF_QUNDAO_SPLITTER
} from './buff/qundao'

import fs from '@system.file'

const reverse_obj = (obj) => {
    const ret = {}
    for (let k in obj) {
        let v = obj[k]
        ret[v] = k
    }
    return ret
}
const dictionaric = (arr) => {
    const buf = {}
    for (let k in arr) {
        let v = arr[k]
        if (v in buf)
            buf[v][0] == 1 && (arr[buf[v][1]] += '1'),
            arr[k] = v + (++ buf[v][0])
        else
            buf[v] = [1, k]
    }
}

const WIDTH = 336, HEIGHT = 480
const UIDS = '【默认】 A B C D E F G H I J K'.split(' ')
const BY = 4, AREA = BY ** 2 - 1
const INIT_PUZZLE = (has0 = true) => {
    const ret = []
    for (let i = 1; i <= AREA; i ++)
        ret.push(i)
    if (has0) ret.push(0)
    return ret
}, PUZZLE_TEMPLATE = INIT_PUZZLE()
const UID_PATH = 'internal://app/uid'
const RECORDS_DIRECTORY_PREFIX = 'internal://app/records'
const RECORDS_PER_PAGE = 5
const RECORDS_DELETE_CONFIRM_TIMES = 10, RECORDS_DELETE_CONFIRM_TIME = 2000,
    RECORDS_CLEAR_CONFIRM_TIMES = 100
const PUZZLE_FILE_DIR = 'internal://app/puzzle'
const BUFFS = {
    '搞心态': 'unsolvable',
    '行长同款': 'deform',
    '爱导必备': 'idao',
//    '《群导》': 'qundao',
//    '诗词大会': 'gushi',
    '最强大脑': 'cover'
}, BUFFS_REVERSE = reverse_obj(BUFFS),
BUFFS_INCOMPATIBLE = {
    'unsolvable': 0,
    'deform': 1,
    'idao': 2,
    'qundao': 2,
    'gushi': 2,
    'cover': 3
}, BUFFS_CONGRATULATIONS = {
    '': ['Of of！吃bolo！', '永哥永哥 五分五分！', '搞么lin啊？'],
    'unsolvable': ['搞心态啊！', '终于有解了！！', '骇死我了……'],
    'deform': ['行长点了个赞……', '行长行为——', '随地大小变！'],
    'idao': ['你怎么还没睡a~~', '我家导导可太帅了——', 'shui~shui~shui~'],
    'qundao': ['idao集合！！', '导门 导门——', '爱导狂喜！！'],
    'gushi': ['来自素云的 :)', '明天跟素云吃饭吧！', '“诗坛争霸”没你我不看！'],
    'cover': ['离谱……', '最强大脑！！', '一句NB走天下！！']
}, BUFFS_ABBR = {
    'unsolvable': 'u',
    'deform': 'd',
    'idao': 'i',
    'qundao': 'q',
    'gushi': 'g',
    'cover': 'c'
}, BUFFS_ABBR_REVERSE = reverse_obj(BUFFS_ABBR)
const BUFF_DEFORM_RATIO = 0.2

const ensureFile = (dir, then, err) => {
    fs.access({
        uri: dir,
        success: then,
        fail() {
            fs.writeText({
                uri: dir,
                text: '',
                success: then,
                fail: err
            })
        }
    })
}
const ensureDir = (dir, then, err) => {
    fs.access({
        uri: dir,
        success: then,
        fail() {
            fs.mkdir({
                uri: dir,
                recursive: true,
                success: then,
                fail: err
            })
        }
    })
}
const fill0 = (str, dig = 2) => {
    str += ''
    while (str.length < dig)
        str = '0' + str
    return str
}
const random = (min, max) => Math.round(min + Math.random() * (max - min))
const time = (ts = null) => {
    if (ts) return ts * 1000
    return Math.floor(new Date().valueOf() / 1000)
}
const time_format = (ts) => {
    const date = new Date(time(ts))
    return date.getFullYear() + '/'
        + (date.getMonth() + 1) + '/'
        + date.getDate() + ' '
        + date.getHours() + ':'
        + fill0(date.getMinutes())
}

export default {
    data: {
        WIDTH: WIDTH,
        HEIGHT: HEIGHT,
        YEAR: new Date().getFullYear(),
        RECORDS_CLEAR_CONFIRM_TIMES: RECORDS_CLEAR_CONFIRM_TIMES,
        BUFFS: Object.keys(BUFFS),
        UIDS: UIDS,
        UIDS_LENGTH: UIDS.length,
        TIME_FORMAT: time_format,
        PUZZLE_SIZE: WIDTH * 0.95,
        PUZZLE_TEMPLATE: PUZZLE_TEMPLATE,

        uid: 0,
        has_saved: 0,
        start_from_saved: 0,
        buff_unsolvable: 0,
        buff_deform: 0,
        buff_idao: 0,
        buff_qundao: 0,
        buff_gushi: 0,
        buff_cover: 0,
        dictionary: [],
        page: 0,
        status: 0,
        timer: 0,
        timerS: 0,
        timerE: 0,
        steps: 0,
        intervalId: null,
        puzzle_0: 0,
        puzzle_1: 0,
        puzzle_2: 0,
        puzzle_3: 0,
        puzzle_4: 0,
        puzzle_5: 0,
        puzzle_6: 0,
        puzzle_7: 0,
        puzzle_8: 0,
        puzzle_9: 0,
        puzzle_10: 0,
        puzzle_11: 0,
        puzzle_12: 0,
        puzzle_13: 0,
        puzzle_14: 0,
        puzzle_15: 0,
        size_0: 1,
        size_1: 1,
        size_2: 1,
        size_3: 1,
        size_4: 1,
        size_5: 1,
        size_6: 1,
        size_7: 1,
        size_8: 1,
        size_9: 1,
        size_10: 1,
        size_11: 1,
        size_12: 1,
        size_13: 1,
        size_14: 1,
        size_15: 1,
        cover_0: 0,
        cover_1: 0,
        cover_2: 0,
        cover_3: 0,
        cover_4: 0,
        cover_5: 0,
        cover_6: 0,
        cover_7: 0,
        cover_8: 0,
        cover_9: 0,
        cover_10: 0,
        cover_11: 0,
        cover_12: 0,
        cover_13: 0,
        cover_14: 0,
        cover_15: 0,
        puzzle_zid: 0,
        recordsPageId: 0,
        recordsOrder: 0,
        records: [
            {
                i: 0,
                time: 0,
                record: 0,
                steps: 0,
                buffs: '',
                fname: '',
                delete_confirms: 0
            }
        ],
        recordsLength: 0,
        recordsPages: 0,
        recordsCurrent: [
            {
                i: 0,
                time: 0,
                record: 0,
                steps: 0,
                buffs: '',
                fname: ''
            }
        ],
        clearRecordsConfirms: 0
    },

    onInit() {
        this.loadSavedUid()
        this.checkSavedPuzzle()
        this.loadPuzzle()
        this.loadRecords()
    },
    onDestroy() {
        this.savePuzzle()
    },

    calc_startLabel() {
        return this.status == 2 ? this.calc_timer() : (
            this.start_from_saved ? '继续上把' : '开始'
        )
    },
    calc_piecePadding(id) {
        if (this.buff_deform)
            return this.PUZZLE_SIZE * 0.225 * (1 - this['size_' + id])
        else
            return 0
    },
    calc_pieceText(id) {
        let ret
        if (this.buff_idao)
            ret = BUFF_IDAO_DICTIONARY[this['puzzle_' + id] - 1]
        else if (this.buff_qundao || this.buff_gushi)
            ret = this.dictionary[this['puzzle_' + id] - 1]
        else
            ret = this['puzzle_' + id]
        if (this.buff_cover)
            return this['cover_' + id] ? '?' : ret
        else
            return ret
    },
    calc_buffsChecked(name) {
        return this['buff_' + BUFFS[name]]
    },
    calc_uidsChecked(uid) {
        return this.uid == uid
    },
    calc_checkboxsBg(checked) {
        return checked ? 0x90EE90 : 0x808080
    },
    calc_checkboxsBg2(checked) {
        return checked ? 0x90EE90 : 0x000000
    },
    calc_timer(time = this.timer) {
        if (time < 60) return time + 's'
        const m = Math.floor(time / 60)
        const s = fill0(Math.floor(time - 60 * m))
        return `${m}:${s}`
    },
    calc_TPS() {
        return (this.steps / this.timer).toFixed(2)
    },
    calc_congratulation() {
        const buf = []
        for (let k in BUFFS) {
            let v = BUFFS[k]
            if (this['buff_' + v]) {
                for (let k2 in BUFFS_CONGRATULATIONS[v]) {
                    let v2 = BUFFS_CONGRATULATIONS[v][k2]
                    buf.push(v2)
                }
            }
        }
        const ret = buf[random(0, buf.length - 1)]
            || BUFFS_CONGRATULATIONS[''][0]
        return ret
    },
    calc_pagerBg() {
        return this.recordsOrder == 0 ? 0x90EE90 : 0x1E90FF
    },
    calc_PB() {
        let bufRecord = Infinity,
            buf_i = null, buf_v = null
        for (let k in this.records) {
            let v = this.records[k]
            if (v.record <= bufRecord)
                bufRecord = v.record,
                buf_i = v.i,
                buf_v = v
        }
        return buf_i !== null ? [{ i: buf_i, v: buf_v }] : []
    },
    calc_buffsLabel(buffs) {
        if (buffs) {
            let ret = ''
            for (let i = 0; i < buffs.length; i ++) {
                let v = buffs[i]
                if (ret) ret += '&'
                ret += BUFFS_REVERSE[BUFFS_ABBR_REVERSE[v]]
            }
            return ' with ' + ret
        }
        else {
            return ''
        }
    },
    calc_areLiteBuffs() {
        return ! (this.buff_deform || this.buff_idao || this.buff_qundao
        || this.buff_gushi || this.buff_cover)
    },

    loadSavedUid() {
        ensureFile(UID_PATH, () => {
            fs.readText({
                uri: UID_PATH,
                success: (data) => {
                    const { text } = data
                    this.uid = + text || 0
                }
            })
        })
    },
    saveUid() {
        fs.writeText({
            uri: UID_PATH,
            text: '' + this.uid
        })
    },
    gotoPage(n) {
        this.page = n
        if (n == 1) this.updateRecordsPage()
        if (n == 3) this.clearRecordsConfirms = 0
    },
    gotoStatus(n) {
        this.status = n
        if (n == 0) this.loadPuzzle()
    },
    gotoRecordsPage(n) {
        let changed = false
        if (n > 0) {
            if (this.recordsPageId < this.recordsPages - 1)
                this.recordsPageId ++, changed = true
        }
        else {
            if (this.recordsPageId > 0)
                this.recordsPageId --, changed = true
        }
        if (changed) this.updateRecordsPage()
    },
    gotoPagerOrder(n) {
        this.recordsOrder = n
        this.updateRecordsPage()
    },
    checkBuff(name) {
        name = BUFFS[name]
        this['buff_' + name] = 1 - this['buff_' + name]
        if (this['buff_' + name]) {
            const cv = BUFFS_INCOMPATIBLE[name]
            for (let k in BUFFS_INCOMPATIBLE) {
                let v = BUFFS_INCOMPATIBLE[k]
                if (k != name && v == cv)
                    this['buff_' + k] = 0
            }
        }
    },
    checkUid(i) {
        this.uid = i
        this.saveUid()
        this.loadRecords()
    },
    loadRecords() {
        this.records = []

        const dir = RECORDS_DIRECTORY_PREFIX + this.uid
        ensureDir(dir, () => {
            fs.list({
                uri: dir,
                success: (data) => {
                    const { fileList } = data
                    for (let i = 0; i < fileList.length; i ++) {
                        let v = fileList[i]
                        const tmp = v.uri.split('/')
                        const fname = tmp[tmp.length - 1]
                        const arr = fname.split('_')
                        const [time, record, steps, buffs]
                             = [arr[0], arr[1], arr[2], arr[3]]
                        this.records.push({
                            i: i,
                            time: + time,
                            record: + record,
                            steps: + steps,
                            buffs: buffs,
                            fname: dir + '/' + fname,
                            delete_confirms: 0
                        })
                    }
                },
                complete: () => this.updateRecordsPage()
            })
        })
    },
    updateRecordsPage() {
        if (this.page != 1) return null

        this.recordsLength = this.records.length
        this.recordsPages = Math.ceil(this.records.length / RECORDS_PER_PAGE)

        if (this.recordsPageId > this.recordsPages - 1)
            this.recordsPageId = this.recordsPages - 1
        if (this.recordsPageId < 0)
            this.recordsPageId = 0

        const ei = - RECORDS_PER_PAGE * this.recordsPageId,
            si = ei - RECORDS_PER_PAGE
        const page = this.records.slice(si, ei || undefined)
        if (this.recordsOrder == 0) {
            page.reverse()
        }
        else {
            page.sort((a, b) => {
                if (a.record != b.record)
                    return a.record > b.record
                else
                    return a.time < b.time
            })
        }
        this.recordsCurrent = page
        this.records.splice(0, 0)

        this.$refs.recordsList.scrollTo({})
    },
    appendRecord(json) {
        json.i = this.records.length
        json.delete_confirms = 0
        this.records.splice(this.records.length, 0, json)
        const fname = RECORDS_DIRECTORY_PREFIX + this.uid + '/' + json.time + '_'
                + json.record + '_' + json.steps + '_' + json.buffs
        json.fname = fname
        this.updateRecordsPage()

        fs.writeText({
            uri: fname,
            text: ''
        })
    },
    deleteRecordReally(i) {
        const old = this.records[i]
        this.records.splice(i, 1)
        this.updateRecordsPage()

        fs.delete({
            uri: old.fname,
            text: ''
        })
    },
    deleteRecord(i) {
        if (this.records[i].delete_confirms >= RECORDS_DELETE_CONFIRM_TIMES) {
            this.deleteRecordReally(i)
        }
        else {
            this.records[i].delete_confirms ++
            if (this.records[i].delete_confirms == 1) {
                setTimeout(
                    () => this.records[i].delete_confirms = 0,
                    RECORDS_DELETE_CONFIRM_TIME
                )
            }
        }
    },
    clearRecordsReally() {
        this.records = []
        this.updateRecordsPage()

        const dir = RECORDS_DIRECTORY_PREFIX + this.uid
        fs.rmdir({
            uri: dir,
            recursive: true,
            success: () => ensureDir(dir)
        })
    },
    clearRecords() {
        if (this.clearRecordsConfirms >= RECORDS_CLEAR_CONFIRM_TIMES) {
            this.clearRecordsReally()
            this.clearRecordsConfirms = 0
        }
        else {
            this.clearRecordsConfirms ++
        }
    },
    findRecordsPage(i) {
        const ni = this.records.length - 1 - i
        return {
            x: Math.floor(ni / RECORDS_PER_PAGE),
            y: ni % RECORDS_PER_PAGE
        }
    },
    gotoRecord(i) {
        const { x, y } = this.findRecordsPage(i)
        this.recordsOrder = 0
        this.recordsPageId = x
        this.updateRecordsPage()
        this.$refs.recordsList.scrollTo({
            index: y
        })
    },
    loadLibrary() {
        if (this.buff_qundao) {
            const si = BUFF_QUNDAO_STOPS[random(0, BUFF_QUNDAO_STOPS.length - 1)]
            const arr = BUFF_QUNDAO_LIBRARY.slice(si, si + AREA)
                .split(BUFF_QUNDAO_SPLITTER)
            dictionaric(arr)
            this.dictionary = arr
        }
        else if (this.buff_gushi) {
            let arr = BUFF_GUSHI_LIBRARY[
                random(0, BUFF_GUSHI_LIBRARY.length - 1)
            ].split(BUFF_GUSHI_SPLITTER)
            const si = random(0, arr.length - AREA)
            arr = arr.slice(si, si + AREA)
            dictionaric(arr)
            this.dictionary = arr
        }
    },
    loadPuzzle(arr = null, fromSaved = false) {
        arr = arr || PUZZLE_TEMPLATE
        for (let i = 0; i < AREA + 1; i ++) {
            if (! fromSaved) {
                this['puzzle_' + i] = arr[i]
                this['size_' + i] = 1
                this['cover_' + i] = 0
            }
            else if (this.buff_deform)
                this['size_' + i] = 1 - BUFF_DEFORM_RATIO
            else if (this.buff_cover)
                this['cover_' + i] = 1
            if (this['puzzle_' + i] === 0)
                this.puzzle_zid = i
        }
        this.loadLibrary()
    },
    checkSavedPuzzle() {
        fs.access({
            uri: PUZZLE_FILE_DIR,
            success: () => this.has_saved = 1,
            fail: () => this.has_saved = 0
        })
    },
    savePuzzle() {
        const t = this
        if (this.page != 0 || this.status != 2) return null

        const puzzle = []
        for (let i = 0; i < AREA + 1; i ++)
            puzzle.push(this['puzzle_' + i])
        let buffs = ''
        for (let k in BUFFS) {
            let v = BUFFS[k]
            if (this['buff_' + v])
                buffs += BUFFS_ABBR[v]
        }
        const conf = [
            puzzle.join(','),
            buffs,
            t.timer,
            t.steps,
            t.dictionary.join(',')
        ]
        const json = JSON.stringify(conf)

        fs.writeText({
            uri: PUZZLE_FILE_DIR,
            text: json
        })
    },
    loadSavedPuzzle() {
        fs.readText({
            uri: PUZZLE_FILE_DIR,
            success: (data) => {
                this.clearSavedPuzzle()
                const { text } = data, json = JSON.parse(text)
                const [puzzle, buffs, timer, steps, dictionary]
                    = [json[0], json[1], json[2], json[3], json[4]]
                const rpuzzle = puzzle.split(',')
                for (let i = 0; i < rpuzzle.length; i ++) {
                    let v = + rpuzzle[i]
                    this['puzzle_' + i] = v
                }
                for (let i = 0; i < buffs.length; i ++) {
                    let v = BUFFS_ABBR_REVERSE[buffs[i]]
                    this['buff_' + v] = 1
                }
                this.timer = timer
                this.steps = steps
                this.dictionary = dictionary.join(',')
            }
        })
    },
    clearSavedPuzzle() {
        fs.delete({
            uri: PUZZLE_FILE_DIR,
            success: () => this.has_saved = 0
        })
    },
    start() {
        const fromSaved = this.start_from_saved
        if (fromSaved)
            this.loadSavedPuzzle()
        else if (this.status != 0 && this.status != 1)
            return null

        this.start_from_saved = 0
        this.status = 2
        if (! fromSaved) {
            this.timer = 0
            this.timerS = new Date().valueOf()
            this.steps = 0
            this.scramble()
        }
        else {
            this.timerS = new Date().valueOf() - this.timer * 1000
            this.loadPuzzle(null, true)
        }

        this.intervalId = setInterval(() => {
            this.timer ++
        }, 1000)
    },
    changeStartMode() {
        if (this.has_saved)
            this.start_from_saved = 1 - this.start_from_saved
    },
    scramble() {
        const pool = INIT_PUZZLE(false)
        const arr = []
        let noi = 0

        for (let i = 0; i < AREA; i ++) {
            const k = random(0, pool.length - 1),
                v = pool[k]
            arr.push(v)
            pool.splice(k, 1)
        }

        if (! this.buff_unsolvable) {
            for (let i = 0; i < AREA; i ++)
                for (let j = i + 1; j < AREA; j ++)
                    if (arr[i] > arr[j]) noi ++
            if (BY % 2 != 0) {
                if (noi % 2 != 0)
                    arr[0] = arr[AREA]
                arr.splice(random(0, AREA + 1), 0, 0)
            }
            else if (BY % 2 == 0) {
                const zrow = noi % 2 == 0
                    ? random(1, BY / 2) * 2 - 1
                    : random(1, BY / 2) * 2 - 1 - 1,
                    zcol = random(0, BY - 1)
                arr.splice(BY * zrow + zcol, 0, 0)
            }
        }
        else if (BY % 2 == 0) {
            const zrow = random(0, BY - 1),
                zcol = random(0, BY - 1)
            arr.splice(BY * zrow + zcol, 0, 0)
        }

        this.loadPuzzle(arr)
    },
    move(id) {
        if (this.status != 2) return null

        const zid = this.puzzle_zid
        let moved = false
        if (Math.floor(zid / BY) === Math.floor(id / BY)) {
            if (zid > id)
                for (let i = zid; i >= id; i -= 1)
                    this['puzzle_' + i]
                        = i > id ? this['puzzle_' + (i - 1)] : 0
            else
                for (let i = zid; i <= id; i += 1)
                    this['puzzle_' + i]
                        = i < id ? this['puzzle_' + (i + 1)] : 0
            moved = true
        }
        else if ((zid - id) % BY === 0) {
            if (zid > id)
                for (let i = zid; i >= id; i -= BY)
                    this['puzzle_' + i]
                        = i > id ? this['puzzle_' + (i - BY)] : 0
            else
                for (let i = zid; i <= id; i += BY)
                    this['puzzle_' + i]
                        = i < id ? this['puzzle_' + (i + BY)] : 0
            moved = true
        }

        if (moved) {
            this.puzzle_zid = id
            this.steps ++
            this.check()

            if (this.buff_deform) {
                if (this['size_' + id] > 1 - BUFF_DEFORM_RATIO)
                    this['size_' + id] -= BUFF_DEFORM_RATIO
                else
                    this['size_' + id] = 1
            }
            if (this.buff_cover)
                this['cover_' + id] = 1 - this['cover_' + id]
        }
    },
    check() {
        if (this['puzzle_' + AREA] !== 0) return null
        for (let i = 0; i < AREA; i ++)
            if (this['puzzle_' + i] != i + 1) return null
        this.finish()
    },
    finish() {
        const t = this
        this.timerE = new Date().valueOf()
        this.timer = + ((this.timerE - this.timerS) / 1000).toFixed(2)
        clearInterval(this.intervalId)
        this.intervalId = null
        this.status = 3

        let buffs = ''
        for (let k in BUFFS) {
            let v = BUFFS[k]
            if (this['buff_' + v])
                buffs += BUFFS_ABBR[v]
        }
        this.appendRecord({
            time: time(),
            record: this.timer,
            steps: t.steps,
            buffs: buffs
        })
    }
}
