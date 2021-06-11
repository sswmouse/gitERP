const fs = require("fs")
const Router = require('koa-router');
const router = new Router();

const axios = require('axios');
const { join } = require("path");

// const jwt = require('jsonwebtoken')

var mysql = require('mysql');
const { match } = require('assert');
var db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'ERP'
});
db.connect();
router.get('/', ctx => {
    ctx.body = 1111
})

function getnowtime() {
    let dateTime
    let yy = new Date().getFullYear()
    let mm = new Date().getMonth() + 1
    let dd = new Date().getDate()
    let hh = new Date().getHours()
    let mf = new Date().getMinutes() < 10 ? '0' + new Date().getMinutes()
        :
        new Date().getMinutes()
    let ss = new Date().getSeconds() < 10 ? '0' + new Date().getSeconds()
        :
        new Date().getSeconds()
    dateTime = yy + '-' + mm + '-' + dd + ' ' + hh + ':' + mf + ':' + ss
    console.log(dateTime)
    return dateTime
}


// 登录
router.post('/onLogin', async (ctx, next) => {
    const code = ctx.request.body.code
    var url = 'https://api.weixin.qq.com/sns/jscode2session?appid=wxcc4686bf03f2240a&secret=b1e57f6bdd35ca94b5bbd9a805a1bae6&js_code=' + code + '&grant_type=authorization_code'
    var promise = new Promise(function (f1, f2) {
        axios.get(url)
            .then((res) => {
                const { data: { openid } } = res
                const sql_str = `select * from userinfor where openid='${openid}'`
                db.query(sql_str, function (err, data, ziduan) {
                    if (err) {
                        f2({ code: 444, desc: '服务器内部错误，稍后重试！', detail: err })
                    } else {
                        if (data.length > 0) {
                            f1({ code: 1, desc: '用户存在', detail: data })

                        } else {
                            f1({ code: 0, desc: '用户不存在', detail: '' })
                        }
                    }
                })
            }, (err) => {
                f2({ code: 444, desc: '微信内部服务器验证失败', detail: err })
            })
    })
    ctx.body = await promise
});


// 注册
router.post('/register', async (ctx, next) => {
    const code = ctx.request.body.code
    const user_data = ctx.request.body.data
    // const newuserinfo = ctx.request.body.newuserinfo
    console.log(user_data)
    const url = 'https://api.weixin.qq.com/sns/jscode2session?appid=wxcc4686bf03f2240a&secret=b1e57f6bdd35ca94b5bbd9a805a1bae6&js_code=' + code + '&grant_type=authorization_code'
    var promise = new Promise((f1, f2) => {
        axios.get(url).then((res) => {
            const { data: { openid, session_key } } = res
            const sql = `INSERT INTO userinfor(openid,session_key,name,sex,phone,mendian,dizi) VALUES ('${openid}','${session_key}','${user_data.name}','${user_data.sex}','${user_data.phone}','${user_data.mendian}','${user_data.dizi}')`
            db.query(sql, function (err, data, fields) {
                if (err) {
                    f2({ code: 444, desc: '服务器内部错误，稍后重试！', detail: err })
                } else {
                    f1({ code: 0, desc: '用户数据添加成功，完成注册！', detail: '' })
                }
            })//db1
        }, (err) => {
            f2({ code: 444, desc: '微信内部服务器验证失败', detail: err })
        })
    })
    ctx.body = await promise
});//router







// wxcc4686bf03f2240a
// b1e57f6bdd35ca94b5bbd9a805a1bae6

// router.post('/onLogin', async ctx => {
//     var code = ctx.request.body.code
//     var url = 'https://api.weixin.qq.com/sns/jscode2session?appid=wxcc4686bf03f2240a&secret=b1e57f6bdd35ca94b5bbd9a805a1bae6&js_code=' + code + '&grant_type=authorization_code'
//     var promise = new Promise(function (f1, f2) {
//         axios.get(url).then((res) => {
//             //解构 
//             const { data: { session_key } } = res
//             const { data: { openid } } = res
//             // var rd_session = jwt.sign(obj,secret,opt)
//             // console.log(rd_session)
//             const sql_str = `select * from userinfor where openid='${openid}'`
//             db.query(sql_str, function (err, data1, fields) {
//                 if (err) {
//                     f2({ code: 1, desc: '服务器内部错误', detail: err })
//                 } else {
//                     if (data1.length > 0) {
//                         const sql_str1 = `UPDATE userinfor SET session_key='${session_key}' WHERE openid='${openid}'`
//                         db.query(sql_str1, function (err1, data2, fields) {
//                             if (err1) {
//                                 f2(JSON.stringify({ code: 1, desc: '服务器内部错误，稍后重试', detail: err1 }))
//                             }
//                             f1(JSON.stringify({ code: 0, desc: '更新session_key成功', detail: '' }))
//                         })
//                     } else {
// const sql_str2 = `INSERT INTO userinfor(openid,session_key) VALUES ('${openid}','${session_key}')`
// db.query(sql_str2, function (err2, data3, fields) {
//     if (err2) {
//         f2(JSON.stringify({ code: 1, desc: '服务器内部错误2，稍后重试！', detail: err2 }))
//     } else {
//         f1(JSON.stringify({ code: 0, desc: '用户添加成功', detail: '' }))
//     }
// })
//                     }
//                 }
//             })
//         }, (err) => {
//             f1(JSON.stringify({ code: 2, desc: '微信内部服务器验证失败', detail: err }))
//         })
//     })
//     ctx.body = await promise
// })








//测试接口
router.post('/ceshi', async (ctx, next) => {
    var sql_str = `select * from userinfor`
    var promise = new Promise(function (f1, f2) {
        db.query(sql_str, function (err, data, ziduan) {
            if (err) {
                f2(err)
            } else {
                data = JSON.stringify(data)
                f1(data)
            }
        })
    })
    ctx.body = await promise
})





module.exports = router
