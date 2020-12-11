'use strict';

/**
 * Todo 入力/出力
 * @const createTdInpt 登録Todoの入力
 * @const dispTdLists  TodoListsの一覧表示
 */ 
const createTdInpt = document.getElementById('create_todo_input');
const dispTdLists = document.getElementById('disp_todo_lists');

/**
 * 
 * Radioフォーム
 * @const changeDispTask    Radioタスクフォーム
 * 
 * Radio入力
 * @const dispAllTskRadio   全件表示
 * @const dispMaintTskRadio メンテナンスタスクのみ表示
 * @const dispCompTskRadio  完了タスクのみ表示
 * 
 * Button入力
 * @const createTdBtn       Todoリスト新規作成
 */

const changeDispTask = document.getElementById('change_disp_tasks_radio');
const dispAllTskRadio = changeDispTask[0];
const dispMaintTskRadio = changeDispTask[1];
const dispCompTskRadio = changeDispTask[2];

const createTdBtn = document.getElementById('create_todo_button');

let todos = []; // Todoを格納する配列

const filterTdList = () => {
    if (!todos) { 
        return
    }
    let filterTdValue;
    changeDispTask.addEventListener('change', () => {
        if (dispAllTskRadio.checked) {
            sortTdList(todos);
        } else if (dispMaintTskRadio.checked) {
            filterTdValue = todos.filter(todo => { 
                return todo.state === '実行中';
            })
            sortTdList(filterTdValue);
        } else if (dispCompTskRadio.checked) { 
            filterTdValue = todos.filter(todo => { 
                return todo.state === '完了';
            })
            sortTdList(filterTdValue);
        }
    })
}

filterTdList();

const sortTdList = (filterTdValue) => {
    let sortTdValue;
    filterTdValue ? sortTdValue = filterTdValue : sortTdValue = todos;
    dispTdLists.innerHTML = '';
    sortTdValue.forEach((todo, id) => {
        // インプット設定
        const todoId = id;
        const todokeyId = todo.taskid;
        const todoContent = todo.content;
        const todoState = todo.state;
        const todoDelete = todo.delete;

        // タグ生成
        const tdTableTr = document.createElement('tr');
        const tdStatusTd = document.createElement('td');
        const tdStatusBtn = document.createElement('button');
        const tdDelTd = document.createElement('td');
        const tdDelBtn = document.createElement('button');
        tdStatusBtn.innerHTML = todoState;
        tdDelBtn.innerHTML = todoDelete;
    
        const tdIdSpan = document.createElement('span');
        tdIdSpan.innerHTML = todoId;
        const tdIdSpanTd = document.createElement('td');
        tdIdSpanTd.append(tdIdSpan);
        
        const taskSpan = document.createElement('span');
        const taskSpanTd = document.createElement('td');
        taskSpan.innerText = todoContent;
        taskSpanTd.append(taskSpan);
        
        tdStatusTd.appendChild(tdStatusBtn);
        tdDelTd.appendChild(tdDelBtn);
        
        tdTableTr.appendChild(tdIdSpanTd);
        tdTableTr.appendChild(taskSpanTd);
        tdTableTr.appendChild(tdStatusTd);
        tdTableTr.appendChild(tdDelTd);
        
        dispTdLists.appendChild(tdTableTr);
    
        deleteTodoList(tdDelBtn, todokeyId); // Todoの削除
        changeStateTdList(tdStatusBtn, todoId); // Todoの状態変更
    });
}

const deleteTodoList = (tdDelBtn, todokeyId) => {
    tdDelBtn.addEventListener('click', () => {
        const filterTdValue = todos.filter(todo => {
            return todo.taskid !== todokeyId;
        })
        todos = filterTdValue;
        const deleteTd = tdDelBtn.closest('tr');
        dispTdLists.removeChild(deleteTd);
        if (dispMaintTskRadio.checked || dispCompTskRadio.checked) { 
            return;
        }
        // sortTdList(todos);
        sortTdList(filterTdValue);
    })
}

const changeStateTdList = (tdStatusBtn, todoId) => {
    const taskMaintMsg = '実行中';
    const taskCompMsg = '完了';
    tdStatusBtn.addEventListener('click', () => {
        todos[todoId].state === '実行中' ? todos[todoId].state = taskCompMsg : todos[todoId].state = taskMaintMsg;
        tdStatusBtn.innerHTML = todos[todoId].state;
        if (dispAllTskRadio.checked) {
            sortTdList(todos);
        } else if (dispMaintTskRadio.checked || dispCompTskRadio.checked) { 
            const changeStateTd = tdStatusBtn.closest('tr');
            dispTdLists.removeChild(changeStateTd);
        }
    })
}

let taskkeyId = 0;

const createTdList = () => { 
    createTdBtn.addEventListener('click', () => {
        if (!createTdInpt.value) { 
        return;
        };
        const todo = {
            taskid: taskkeyId,
            content: createTdInpt.value,
            state: '実行中',
            delete: '削除',
        };
        todo.taskid = taskkeyId++;
        todos.push(todo);
        createTdInpt.value = '';
        if (dispCompTskRadio.checked) {
            return;
        } else if (dispMaintTskRadio.checked) {
            let filterTdValue = todos.filter(task => { 
                return task.state === "実行中";
            })
            sortTdList(filterTdValue);
            return;
        }
        sortTdList(todos);
    })
}

createTdList();
