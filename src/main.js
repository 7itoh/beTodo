'use strict';

/**
 * Todo 入力/出力
 * @const createTdInpt 登録Todoの入力
 * @const dispTdLists  TodoListsの一覧表示
 */ 
const createTdInpt = document.getElementById('create_todo_input');
const dispTdLists = document.getElementById('disp_todo_lists');

/**
 * Radio入力
 * @const dispAllTskRadio   全件表示
 * @const dispMaintTskRadio メンテナンスタスクのみ表示
 * @const dispCompTskRadio  完了タスクのみ表示
 * 
 * Button入力
 * @const createTdBtn Todoリスト新規作成
 */ 

const dispAllTskRadio = document.getElementById('disp_all_tasks_radio');
const dispMaintTskRadio = document.getElementById('disp_mainte_tasks_radio');
const dispCompTskRadio = document.getElementById('disp_complete_tasks_radio');
const createTdBtn = document.getElementById('create_todo_button');

const todos = []; // Todoを格納する配列

const createTdList = todo => { 
    const isValue = (element) => element === todo;
    const id = todos.findIndex(isValue); //id生成
    console.log(todos.findIndex(isValue)); //indexチェック

    // タグ生成
    const tdTableTr = document.createElement('tr');
    const tdStatusTd = document.createElement('td');
    const tdStatusBtn = document.createElement('button');
    const tdDelTd = document.createElement('td');
    const tdDelBtn = document.createElement('button');
    tdStatusBtn.innerHTML = todos[id].state;
    tdDelBtn.innerHTML = todos[id].delete;

    const tdIdSpan = document.createElement('span');
    tdIdSpan.innerHTML = id;
    const tdIdSpanTd = document.createElement('td');
    tdIdSpanTd.append(tdIdSpan);
    
    const taskSpan = document.createElement('span');
    const taskSpanTd = document.createElement('td');
    taskSpan.innerText = todos[id].content;
    taskSpanTd.append(taskSpan);
    
    tdStatusTd.appendChild(tdStatusBtn);
    tdDelTd.appendChild(tdDelBtn);
    
    tdTableTr.appendChild(tdIdSpanTd);
    tdTableTr.appendChild(taskSpanTd);
    tdTableTr.appendChild(tdStatusTd);
    tdTableTr.appendChild(tdDelTd);
    
    dispTdLists.appendChild(tdTableTr);

    deleteTodoList(tdDelBtn, id); // Todoの削除
}

const deleteTodoList = (tdDelBtn, id) => { 
    tdDelBtn.addEventListener('click', () => { 
        todos.splice(id, 1);
        const deleteTd = tdDelBtn.closest('tr');
        dispTdLists.removeChild(deleteTd);
        const removedTdList = todos;
        sortTdList(removedTdList);
    })
}

const sortTdList = removedTdList => {
    const lists = removedTdList
    dispTdLists.innerHTML = '';
    for (let i = 0; i < removedTdList.length; i++) { 
        let id = i;

        // タグ生成
        const tdTableTr = document.createElement('tr');
        const tdStatusTd = document.createElement('td');
        const tdStatusBtn = document.createElement('button');
        const tdDelTd = document.createElement('td');
        const tdDelBtn = document.createElement('button');
        tdStatusBtn.innerHTML = lists[id].state;
        tdDelBtn.innerHTML = lists[id].delete;

        const tdIdSpan = document.createElement('span');
        tdIdSpan.innerHTML = id;
        const tdIdSpanTd = document.createElement('td');
        tdIdSpanTd.append(tdIdSpan);
        
        const taskSpan = document.createElement('span');
        const taskSpanTd = document.createElement('td');
        taskSpan.innerText = lists[id].content;
        taskSpanTd.append(taskSpan);
        
        tdStatusTd.appendChild(tdStatusBtn);
        tdDelTd.appendChild(tdDelBtn);
        
        tdTableTr.appendChild(tdIdSpanTd);
        tdTableTr.appendChild(taskSpanTd);
        tdTableTr.appendChild(tdStatusTd);
        tdTableTr.appendChild(tdDelTd);
        
        dispTdLists.appendChild(tdTableTr);

        deleteTodoList(tdDelBtn, id); // Todoの削除
    }
}

createTdBtn.addEventListener('click', () => {
    if (!createTdInpt.value) { 
    return;
    }
    console.log(createTdInpt.value); //入力チェック
    const todo = {
        content: createTdInpt.value,
        state: '実行中',
        delete: '削除',
    };
    todos.push(todo);
    createTdInpt.value = '';
    createTdList(todo);
})
