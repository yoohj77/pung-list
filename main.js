var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var main = function () {
    var pungList = [];
    var list = document.getElementById("pung-list");
    var isAllStop = false;
    document.addEventListener("DOMContentLoaded", function () {
        //bind함수에는 contenxt를 항상 넘겨줘야 하므로 null을 넘겨줌
        document.getElementById("5sec").onclick = onButtonClick.bind(null, 5000);
        document.getElementById("10sec").onclick = onButtonClick.bind(null, 10000);
        document.getElementById("20sec").onclick = onButtonClick.bind(null, 20000);
        document.getElementById("init").onclick = clearList.bind(null);
        document.getElementById("multiple").onclick = multipleList.bind(null);
        document.getElementById("plus5").onclick = plusFiveSecond.bind(null);
        document.getElementById("stop").onclick = allStop.bind(null);
        document.getElementById("startAll").onclick = allReStart.bind(null);
    });
    function onButtonClick(time) {
        var contentEl = document.getElementById("content");
        var contentValue = contentEl.value;
        if (!contentValue) {
            alert("내용을 입력하세요");
            return;
        }
        addItem(time, contentValue);
        // contentEl.value = "";
        console.log(pungList);
    }
    ;
    function addItem(time, contentValue) {
        var key = Math.random();
        var isStop = false;
        pungList.push({ key: key, contentValue: contentValue, time: time, isStop: isStop });
    }
    function removeAllList() {
        while (list.hasChildNodes()) {
            list.removeChild(list.firstChild);
        }
        ;
    }
    function clearList() {
        pungList = [];
    }
    function multipleList() {
        var copyList = __spreadArray([], pungList, true);
        copyList.forEach(function (obj) {
            obj.key = obj.key + 999;
        });
        pungList = __spreadArray(__spreadArray([], pungList, true), copyList, true);
    }
    function plusFiveSecond() {
        pungList.forEach(function (obj) {
            obj.time = obj.time + 5000;
        });
    }
    function allStop() {
        isAllStop = true;
    }
    function allReStart() {
        isAllStop = false;
    }
    function deleteItem(key) {
        pungList = pungList.filter(function (obj) { return obj.key != key; });
    }
    function stopItem(key) {
        pungList.map(function (obj) {
            if (obj.key == key) {
                obj.isStop = obj.isStop == true ? false : true;
            }
        });
    }
    setInterval(function () {
        if (!isAllStop) {
            //1) 리스트 초기화
            removeAllList();
            //2) 남은시간으로 차감 
            pungList.forEach(function (obj) {
                if (obj.isStop) {
                    return;
                }
                obj.time = obj.time - 1000;
            });
            //3) 시간에 도달한 것 필터링 
            pungList = pungList.filter(function (obj) {
                return obj.time > 0;
            });
            //4) 내림차순정렬
            pungList.sort(function (a, b) {
                if (a.time > b.time)
                    return -1;
                if (a.time === b.time)
                    return 0;
                if (a.time < b.time)
                    return 1;
                return 0;
            });
            pungList.forEach(function (obj) {
                var li = document.createElement("li");
                li.setAttribute("id", obj.key);
                var text = document.createTextNode(obj.contentValue.concat(" :", (obj.time / 1000).toString(), "초"));
                li.appendChild(text);
                var delButton = document.createElement('button');
                delButton.id = "deleteItem";
                delButton.innerText = "삭제";
                delButton.addEventListener('click', deleteItem.bind(null, obj.key));
                li.appendChild(delButton);
                var stopButton = document.createElement('button');
                stopButton.id = "stopItem";
                stopButton.addEventListener('click', stopItem.bind(null, obj.key));
                obj.isStop == true ? stopButton.innerText = "시작" : stopButton.innerText = "중지";
                li.appendChild(stopButton);
                list.appendChild(li);
            });
        }
    }, 1000);
};
main();
