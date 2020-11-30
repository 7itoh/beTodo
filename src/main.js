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

const sortTdList = (createTdValue,removedTdValue) => {
    let todosInput;
    if (createTdValue) {
        todosInput = createTdValue;
    } else if (removedTdValue) {
        todosInput = removedTdValue;
    }
    dispTdLists.innerHTML = '';
    Object.keys(todosInput).forEach((key, id) => {
        // インプットセット
        const todoId = id;
        const todoContent = todosInput[key].content;
        const todoState = todosInput[key].state;
        const todoDelete = todosInput[key].delete;

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
    
        deleteTodoList(tdDelBtn, todoId); // Todoの削除
    });
}

const deleteTodoList = (tdDelBtn, todoId) => { 
    tdDelBtn.addEventListener('click', () => { 
        todos.splice(todoId, 1);
        const deleteTd = tdDelBtn.closest('tr');
        dispTdLists.removeChild(deleteTd);
        const removedTdValue = todos;
        sortTdList(removedTdValue);
    })
}

createTdBtn.addEventListener('click', () => {
    if (!createTdInpt.value) { 
    return;
    }
    const todo = {
        content: createTdInpt.value,
        state: '実行中',
        delete: '削除',
    };
    todos.push(todo);
    createTdInpt.value = '';
    let createTdValue = todos;
    sortTdList(createTdValue);
})
