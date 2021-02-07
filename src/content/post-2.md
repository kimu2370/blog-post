---
title: "useState의 함수적 갱신이 마음대로 작동 안되는 이유"
date: "2020-02-07"
draft: false
path: "/blog/post-1"
tags: ["TIL", "useState"]
---

React hook의 **useState 함수적 갱신**을 사용하면서 해결했던 문제에 대해서 글을 써보려 한다.

### useState의 함수적 갱신이란?

보통 useState hook을 사용할 땐 다음과 같이 작성할 것이다.
```jsx
const [state, setState] = useState(init);
```
여기서 `init`에 원시값 말고도 함수를 전달할 수도 있다.
```jsx
setState(() => {
    //something
});
```
### 경험했던 문제

회사에서 프로젝트를 진행하던 중 checkedList에서 checkBox를 체크하면
list 배열 안에 이전 bool값을 변경하여 상태를 업데이트 하고 싶었다.

이해를 돕기 위해 간단하게 코드를 작성해보자.

```jsx
// 예제 코드이다.
const [checkedList, setCheckedList] = useState([false,false,false]);
...
const handleClickForCheckBox = ((index,flag)) => {
    setCheckedList(prevState => {
        const arr = prevState;
        arr[index] = flag;
        return arr;
    });
} 
let flag = 0;
handleClickForcheckBox(1,!flag);
```

checkbox를 클릭했을 때 list안의 해당 index의 값이 업데이트 되길 기대했다.
하지만 예상과는 다르게 업데이트 되지 않았다. 그 이유는 무엇일까?

항상 공식 문서를 먼저 찾아보는 편이여서 쉽게 찾을 수 있었다.
react [공식 홈페이지](https://ko.reactjs.org/docs/hooks-reference.html#functional-updates)에는 다음과 같은 내용이 있었다.

![](https://images.velog.io/images/kimu2370/post/2352cce4-6c8c-4053-98aa-75e588bee499/image.png)

여기서 중요한 점은

**갱신 객체를 자동으로 합치지 않는다. 함수적 갱신을 할 때는 전개 연산자를 사용해야 한다.**

`update function`이 반환하는 것은 배열이다. 자바스크립트에서는 배열도 객체로 취급한다.

그렇기 때문에 **이전 배열의 인덱스의 값을 변경하고 새로운 배열**을 만들어주지 않는다면 리액트는 상태가 바뀌었다는 것을 알지 못한다.


```javascript
let prevCheckedList = [false, false, false];

let arr = prevCheckedList;
arr[1] = true;

prevCheckedList = arr;

arr === prevCheckedList // true; -> React doesn't work

// modified code

...

prevCheckedList = [...arr];

arr === prevCheckedList // false; -> React do work
```

> **Reference**
- [react 함수적 갱신](https://ko.reactjs.org/docs/hooks-reference.html#functional-updates)
- [useState in React: A complete guide](https://blog.logrocket.com/a-guide-to-usestate-in-react-ecb9952e406c/#reacthooksupdatestate)