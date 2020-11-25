'use strict';

/**
 * 
 * 新規Todo作成
 * createTodoInput 登録Todoの入力
 */ 
const createTdInpt = document.getElementById('createTodoInput');

/**
 * Todoリスト一覧　表示
 * 
 *　dispTodoLists TodoLists 表示
 */ 
const dispTdLists = document.getElementById('dispTodoLists');

/**
 * Radioボタン入力
 * 
 * dispAllTasksRadio       全件表示
 * dispMainteTasksRadio    メンテナンスタスクのみ表示
 * dispCompeleteTasksRadio 完了タスクのみ表示
 */ 

const dispAllTskRadio = document.getElementById('dispAllTasksRadio');
const dispMaintTskRadio = document.getElementById('dispMainteTasksRadio');
const dispCompTskRadio = document.getElementById('dispCompeleteTasksRadio');

/**
 * Button入力
 * 
 * createTodoButton Todoリスト新規作成
 */ 
const createTdBtn = document.getElementById('createTodoButton');

/**
 * エラーメッセージ
 * 
 * errMesssage　エラーメッセージ表示
 */ 
const errMsg = document.getElementById('errMesssage');

const todos = [];

const createTdList = todo => { 
    const isValue = (element) => element === todo;
    console.log(todos.findIndex(isValue)); //indexチェック
    console.log(todos.find(isValue));      //valueチェック

    // タグ生成
    const tdTableTr = document.createElement('tr');
    const tdStatusTd = document.createElement('td');
    const tdStatusBtn = document.createElement('button');
    const tdDelTd = document.createElement('td');
    const tdDelBtn = document.createElement('button');
    tdStatusBtn.innerHTML = '作業中';
    tdDelBtn.innerHTML = '削除';

    const tdIdSpan = document.createElement('span');
    tdIdSpan.innerHTML = todos.findIndex(isValue);
    const tdIdSpanTd = document.createElement('td');
    tdIdSpanTd.append(tdIdSpan);

    const taskSpan = document.createElement('span');
    const taskSpanTd = document.createElement('td');
    taskSpan.innerText = todos.find(isValue);
    taskSpanTd.append(taskSpan);
    
    tdStatusTd.appendChild(tdStatusBtn);
    tdDelTd.appendChild(tdDelBtn);

    tdTableTr.appendChild(tdIdSpanTd);
    tdTableTr.appendChild(taskSpanTd);
    tdTableTr.appendChild(tdStatusTd);
    tdTableTr.appendChild(tdDelTd);

    dispTdLists.appendChild(tdTableTr);
}

// createTdBtn.addEventListener('click', createTdList);

createTdBtn.addEventListener('click', () => {
    if (!createTdInpt.value) { 
    errMsg.innerHTML = '「新規タスク追加」蘭に入力がありません'
    return;
    }
    errMsg.innerHTML = '';
    const todo = createTdInpt.value;
    todos.push(todo);
    createTdInpt.value = '';
    createTdList(todo);
})
