import baseComponent from '../helpers/baseComponent'
import classNames from '../helpers/classNames'

baseComponent({
    properties: {
        prefixCls: {
            type: String,
            value: 'wux-upload',
        },
        max: {
            type: Number,
            value: -1,
            observer: 'updated',
        },
        count: {
            type: Number,
            value: 9,
            observer: 'updated',
        },
        defaultFileType: {
            type: String,
            value: 'image',
        },
        compressed: {
            type: Boolean,
            value: true,
        },
        maxDuration: {
            type: Number,
            value: 60,
        },
        camera: {
            type: String,
            value: 'back',
        },
        sizeType: {
            type: Array,
            value: ['original', 'compressed'],
        },
        sourceType: {
            type: Array,
            value: ['album', 'camera'],
        },
        url: {
            type: String,
            value: '',
        },
        name: {
            type: String,
            value: 'file',
        },
        header: {
            type: Object,
            value: {},
        },
        formData: {
            type: Object,
            value: {},
        },
        uploaded: {
            type: Boolean,
            value: true,
        },
        disabled: {
            type: Boolean,
            value: false,
        },
        progress: {
            type: Boolean,
            value: false,
        },
        listType: {
            type: String,
            value: 'text',
        },
        defaultFileList: {
            type: Array,
            value: [],
        },
        fileList: {
            type: Array,
            value: [],
            observer(newVal) {
                if (this.data.controlled) {
                    this.setData({
                        uploadFileList: newVal,
                    })
                }
            },
        },
        controlled: {
            type: Boolean,
            value: false,
        },
        showUploadList: {
            type: Boolean,
            value: true,
        },
        showRemoveIcon: {
            type: Boolean,
            value: true,
        },
    },
    data: {
        uploadMax: -1,
        uploadCount: 9,
        uploadFileList: [],
        isVideo: false,
    },
    computed: {
        classes: ['prefixCls, disabled, listType', function(prefixCls, disabled, listType) {
            const wrap = classNames(prefixCls, {
                [`${prefixCls}--${listType}`]: listType,
                [`${prefixCls}--disabled`]: disabled,
            })
            const files = `${prefixCls}__files`
            const file = `${prefixCls}__file`
            const thumb = `${prefixCls}__thumb`
            const remove = `${prefixCls}__remove`
            const select = `${prefixCls}__select`
            const button = `${prefixCls}__button`

            return {
                wrap,
                files,
                file,
                thumb,
                remove,
                select,
                button,
            }
        }],
    },
    methods: {
        /**
         * ???????????????????????????????????????
         */
        updated() {
            const { count, max } = this.data
            const { uploadMax, uploadCount } = this.calcValue(count, max)

            // ????????????????????????
            if (this.data.uploadMax !== uploadMax || this.data.uploadCount !== uploadCount) {
                this.setData({
                    uploadMax,
                    uploadCount,
                })
            }
        },
        /**
         * ???????????????????????????????????????
         */
        calcValue(count, max) {
            const realCount = parseInt(count)
            const uploadMax = parseInt(max) > -1 ? parseInt(max) : -1
            let uploadCount = realCount

            // ???????????????
            if (uploadMax !== -1 && uploadMax <= 9 && realCount > uploadMax) {
                uploadCount = uploadMax
            }

            return {
                uploadMax,
                uploadCount,
            }
        },
        /**
         * ????????????????????????????????????????????????
         */
        onSelect() {
            const {
                uploadCount,
                uploadMax,
                sizeType,
                sourceType,
                uploaded,
                disabled,
                uploadFileList: fileList,
                isVideo,
                compressed,
                maxDuration,
                camera,
            } = this.data
            const { uploadCount: count } = this.calcValue(uploadCount, uploadMax - fileList.length)
            const success = (res) => {
                res.tempFilePaths = res.tempFilePaths || [res.tempFilePath]
                this.tempFilePaths = res.tempFilePaths.map((item) => ({ url: item, uid: this.getUid() }))
                this.triggerEvent('before', {...res, fileList })

                // ???????????????????????????????????????
                if (uploaded) {
                    this.uploadFile()
                }
            }

            // disabled
            if (disabled) return

            // choose video
            if (isVideo) {
                wx.chooseVideo({
                    sourceType,
                    compressed,
                    maxDuration,
                    camera,
                    success,
                })

                return
            }

            // choose image
            wx.chooseImage({
                count,
                sizeType,
                sourceType,
                success,
            })
        },
        /**
         * ????????????????????????????????????
         * @param {Object} info ????????????
         */
        onChange(info = {}) {
            if (!this.data.controlled) {
                this.setData({
                    uploadFileList: info.fileList,
                })
            }

            this.triggerEvent('change', info)
        },
        /**
         * ?????????????????????????????????
         * @param {Object} file ????????????
         */
        onStart(file) {
            const targetItem = {
                ...file,
                status: 'uploading',
            }

            this.onChange({
                file: targetItem,
                fileList: [...this.data.uploadFileList, targetItem],
            })
        },
        /**
         * ????????????????????????????????????
         * @param {Object} file ????????????
         * @param {Object} res ??????????????????
         */
        onSuccess(file, res) {
            const fileList = [...this.data.uploadFileList]
            const index = fileList.map((item) => item.uid).indexOf(file.uid)

            if (index !== -1) {
                const targetItem = {
                    ...file,
                    status: 'done',
                    res,
                }
                const info = {
                    file: targetItem,
                    fileList,
                }

                // replace
                fileList.splice(index, 1, targetItem)

                this.triggerEvent('success', info)

                this.onChange(info)
            }
        },
        /**
         * ????????????????????????????????????
         * @param {Object} file ????????????
         * @param {Object} res ??????????????????
         */
        onFail(file, res) {
            const fileList = [...this.data.uploadFileList]
            const index = fileList.map((item) => item.uid).indexOf(file.uid)

            if (index !== -1) {
                const targetItem = {
                    ...file,
                    status: 'error',
                    res,
                }
                const info = {
                    file: targetItem,
                    fileList,
                }

                // replace
                fileList.splice(index, 1, targetItem)

                this.triggerEvent('fail', info)

                this.onChange(info)
            }
        },
        /**
         * ???????????????????????????????????????
         * @param {Object} file ????????????
         * @param {Object} res ??????????????????
         */
        onProgress(file, res) {
            const fileList = [...this.data.uploadFileList]
            const index = fileList.map((item) => item.uid).indexOf(file.uid)

            if (index !== -1) {
                const targetItem = {
                    ...file,
                    progress: res.progress,
                    res,
                }
                const info = {
                    file: targetItem,
                    fileList,
                }

                // replace
                fileList.splice(index, 1, targetItem)

                this.triggerEvent('progress', info)

                this.onChange(info)
            }
        },
        /**
         * ???????????????????????????????????????
         */
        uploadFile() {
            if (!this.tempFilePaths.length) return

            const { url, name, header, formData, disabled, progress } = this.data
            const file = this.tempFilePaths.shift()
            const { uid, url: filePath } = file

            if (!url || !filePath || disabled) return

            this.onStart(file)

            this.uploadTask[uid] = wx.uploadFile({
                url,
                filePath,
                name,
                header,
                formData,
                success: (res) => this.onSuccess(file, res),
                fail: (res) => this.onFail(file, res),
                complete: (res) => {
                    delete this.uploadTask[uid]
                    this.triggerEvent('complete', res)
                    this.uploadFile()
                },
            })

            // ????????????????????????????????????
            if (progress) {
                this.uploadTask[uid].onProgressUpdate((res) => this.onProgress(file, res))
            }
        },
        /**
         * ??????????????????????????????
         * @param {Object} e ????????????
         */
        onPreview(e) {
            this.triggerEvent('preview', {...e.currentTarget.dataset, fileList: this.data.uploadFileList })
        },
        /**
         * ????????????????????????????????????
         * @param {Object} e ????????????
         */
        onRemove(e) {
            const { file } = e.currentTarget.dataset
            const fileList = [...this.data.uploadFileList]
            const index = fileList.map((item) => item.uid).indexOf(file.uid)

            if (index !== -1) {
                const targetItem = {
                    ...file,
                    status: 'remove',
                }
                const info = {
                    file: targetItem,
                    fileList,
                }

                // delete
                fileList.splice(index, 1)

                this.triggerEvent('remove', {...e.currentTarget.dataset, ...info })

                this.onChange(info)
            }
        },
        /**
         * ??????????????????
         * @param {String} uid ??????????????????
         */
        abort(uid) {
            const { uploadTask } = this

            if (uid) {
                if (uploadTask[uid]) {
                    uploadTask[uid].abort()
                    delete uploadTask[uid]
                }
            } else {
                Object.keys(uploadTask).forEach((uid) => {
                    if (uploadTask[uid]) {
                        uploadTask[uid].abort()
                        delete uploadTask[uid]
                    }
                })
            }
        },
    },
    /**
     * ????????????????????????????????????????????????????????????????????????
     */
    created() {
        this.index = 0
        this.createdAt = Date.now()
        this.getUid = () => `wux-upload--${this.createdAt}-${++this.index}`
        this.uploadTask = {}
        this.tempFilePaths = []
    },
    /**
     * ?????????????????????????????????????????????????????????????????????
     */
    attached() {
        const { defaultFileType, defaultFileList, fileList, controlled } = this.data
        const uploadFileList = controlled ? fileList : defaultFileList
        const isVideo = defaultFileType === 'video'

        this.setData({ uploadFileList, isVideo })
    },
    /**
     * ??????????????????????????????????????????????????????????????????????????????
     */
    detached() {
        this.abort()
    },
})
