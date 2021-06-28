const fs = require('fs');
const todoList = require('../json/list.json');


const resolver = {
    Query: {
        todoList: () => {
            const list= JSON.parse(fs.readFileSync('./json/list.json').toString());
            console.log(list)
            return list;
        }
    },
    Mutation: {
        addTodo: async (_, { name }) => {
            const data = fs.readFileSync('./json/list.json')
            let query = {
                _id: Math.random().toString(36).substring(3),
                name: name,
                status: 0,
                isEdit: true
            }
            let datas = data.toString();
            datas = JSON.parse(datas);
            // 数据排序
            datas.sort((a, b) => a.id - b.id);

            datas.push(query);
            const datasStr = JSON.stringify(datas);
            fs.writeFileSync('./json/list.json', datasStr);
            const newData = await fs.readFileSync('./json/list.json')
            const list = JSON.parse(newData.toString());
            return { success: true, todoList: list };

        },
        setCompleted: async (_, { _id }) => {
            const data = fs.readFileSync('./json/list.json')
            let datas = data.toString();
            datas = JSON.parse(datas);
            // 查找id
            if (_id.length === 0) {
                return { success: false }
            } else {
                for (const item of datas) {
                    for (const items of _id) {
                        if (String(item._id) === String(items)) {
                            item.status = 1
                        }
                    }

                }
                const datasStr = JSON.stringify(datas);
                fs.writeFileSync('./json/list.json', datasStr);
                const newData = await fs.readFileSync('./json/list.json')
                const list = JSON.parse(newData.toString());
                return { success: true, todoList: list };
            }

        },
        deleteTodo: async (_, { _id }) => {
            const data = fs.readFileSync('./json/list.json');
            let datas = data.toString();
            datas = JSON.parse(datas);
            // 查找id
            const delIndex = datas.findIndex(item => String(item._id) === String(_id));
            datas.splice(delIndex, 1);
            // 删除
            const datasStr = JSON.stringify(datas);
            fs.writeFileSync('./json/list.json', datasStr);
            const newData = await fs.readFileSync('./json/list.json')
            const list = JSON.parse(newData.toString());

            return { success: true, todoList: list };
        },
        editTodo: async (_, { _id, name }) => {
            const data = fs.readFileSync('./json/list.json');
            let datas = data.toString();
            datas = JSON.parse(datas);
            // 查找id
            for (const item of datas) {
                if (String(item._id) === String(_id)) {
                    item.isEdit = true;
                    item.name = name;
                }
            }
            // 修改
            const datasStr = JSON.stringify(datas);
            fs.writeFileSync('./json/list.json', datasStr);
            const newData = await fs.readFileSync('./json/list.json')
            const list = JSON.parse(newData.toString());
            return { success: true, todoList: list };
        }
    }
};
module.exports = resolver;