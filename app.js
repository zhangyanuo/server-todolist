var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
const bodyParser = require('body-parser'); //调用模板
const { ApolloServer } = require('apollo-server-express');
const typeDefs=require('./graphql/schema');
const resolvers=require('./graphql/resolvers')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use(bodyParser.urlencoded({
  extended: true
}));


//graphql

const server = new ApolloServer({
  typeDefs:[typeDefs],
  resolvers
})


app.use('/', indexRouter);
app.use('/users', usersRouter);
// app.get('/getList', function (req, res, next) {
//   fs.readFile('json/list.json', function (err, data) {
//     if (err) {
//       res.send(err)
//     }
//     res.json(JSON.parse(data.toString()));
//   })
// });

// /* GET list page. */
// app.post('/addItems', function (req, res, next) {
//   const query = req.body; //post请求 获取参数
//   fs.readFile('./json/list.json', function (err, data) {
//     if (err) {
//       console.error(err);
//     }
//     if (query) {

//       let datas = data.toString();
//       datas = JSON.parse(datas);
//       // 数据排序
//       datas.sort((a, b) => a.id - b.id);
//       // 添加 新对象
//       //  query.id = datas.data.length;
//       datas.push(query);
//       const datasStr = JSON.stringify(datas);
//       fs.writeFile('./json/list.json', datasStr, function (err) {
//         if (err) {
//           console.error(err);
//         }
//         res.send({
//           resCode: 1,
//           responseText: '添加成功！'
//         });
//       });
//     }
//   })

// });

// // 删
// app.post('/delItems', function (req, res) {
//   const query = req.body; //post请求 获取参数
//   fs.readFile('./json/list.json', function (err, data) {
//     if (err) {
//       console.error(err);
//     }
//     if (query && query.id) {
//       let datas = data.toString();
//       datas = JSON.parse(datas);
//       // 查找id
//       const delIndex = datas.findIndex(item => String(item.id) === String(query.id));
//       datas.splice(delIndex, 1);

//       // 删除
//       const datasStr = JSON.stringify(datas);
//       fs.writeFile('./json/list.json', datasStr, function (err) {
//         if (err) {
//           console.error(err);
//         }
//         res.send({
//           resCode: 1,
//           responseText: '删除成功！'
//         });
//       });
//     }
//   });
// });

// // 改
// app.post('/saveItems', function (req, res) {
//   const query = req.body; //post请求 获取参数
//   fs.readFile('./json/list.json', function (err, data) {
//     if (err) {
//       console.error(err);
//     }
//     if (query && query.id) {
//       let datas = data.toString();
//       datas = JSON.parse(datas);
//       // 查找id
//       console.log(datas)
//       for (const item of datas) {
//         if (String(item.id) === String(query.id)) {
//           item.isEdit = true;
//           item.name = query.name;
//         }
//       }
//       // 修改
//       const datasStr = JSON.stringify(datas);
//       fs.writeFile('./json/list.json', datasStr, function (err) {
//         if (err) {
//           console.error(err);
//         }
//         res.send({
//           resCode: 1,
//           responseText: '修改成功！'
//         });
//       });
//     }
//   });
// });
// //更改状态
// app.post('/saveStatus', function (req, res) {
//   const query = req.body; //post请求 获取参数
//   fs.readFile('./json/list.json', function (err, data) {
//     if (err) {
//       console.error(err);
//     }
//     if (query) {
//       let datas = data.toString();
//       datas = JSON.parse(datas);
//       // 查找id
//       if (query.length === 0) {
//         for (const item of datas) {
//           item.status = 0;
//         }
//       } else {
//         for (const item of datas) {
//           for (const items of query) {
//             if (String(item.id) === String(items.id)) {
//               console.log(item)
//               console.log(items.status)
//               item.status = items.status
//             }
//           }

//         }
//       }

//       // 修改
//       const datasStr = JSON.stringify(datas);
//       fs.writeFile('./json/list.json', datasStr, function (err) {
//         if (err) {
//           console.error(err);
//         }
//         res.send({
//           resCode: 1,
//           responseText: '修改成功！'
//         });
//       });
//     }
//   });
// });
// catch 404 and forward to error handler

server.applyMiddleware({ app });

app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
