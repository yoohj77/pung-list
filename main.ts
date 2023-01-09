const main = () => {
    interface Icontents {
        key: number,
        contentValue: string,
        time: number,
        isStop: boolean
    }
    let pungList: Icontents[] = [];
    const list = (<HTMLElement>document.getElementById("pung-list"));
    let isAllStop = false;

    document.addEventListener("DOMContentLoaded", () => {
        //bind함수에는 contenxt를 항상 넘겨줘야 하므로 null을 넘겨줌
        (<HTMLElement>document.getElementById("5sec")).onclick = onButtonClick.bind(null, 5000);
        (<HTMLElement>document.getElementById("10sec")).onclick = onButtonClick.bind(null, 10000);
        (<HTMLElement>document.getElementById("20sec")).onclick = onButtonClick.bind(null, 20000);

        (<HTMLElement>document.getElementById("init")).onclick = clearList.bind(null);
        (<HTMLElement>document.getElementById("multiple")).onclick = multipleList.bind(null);
        (<HTMLElement>document.getElementById("plus5")).onclick = plusFiveSecond.bind(null);
        (<HTMLElement>document.getElementById("stop")).onclick = allStop.bind(null);
        (<HTMLElement>document.getElementById("startAll")).onclick = allReStart.bind(null);



    });

    function onButtonClick(time: number) {
        const contentEl: HTMLElement = document.getElementById("content") as HTMLElement;
        const contentValue = (<HTMLInputElement>contentEl).value;

        if (!contentValue) {
            alert("내용을 입력하세요");
            return;
        }

        addItem(time, contentValue);
        // contentEl.value = "";
        console.log(pungList);


    };

    function addItem(time: number, contentValue: string) {
        const key = Math.random();
        let isStop = false;
        pungList.push({ key, contentValue, time, isStop });
    }

    function removeAllList() {
        while (list.hasChildNodes()) {
            list.removeChild(<Node>list.firstChild);
        };
    }

    function clearList() {
        pungList = [];
    }

    function multipleList() {
        let copyList = [...pungList];
        copyList.forEach((obj) => {
            obj.key = obj.key + 999;
        })

        pungList = [...pungList, ...copyList];
    }

    function plusFiveSecond() {
        pungList.forEach((obj) => {
            obj.time = obj.time + 5000;
        })
    }

    function allStop() {
        isAllStop = true;
    }

    function allReStart() {
        isAllStop = false;
    }

    function deleteItem(key: number) {
        pungList = pungList.filter((obj) => obj.key != key);

    }

    function stopItem(key: number) {

        pungList.map((obj) => {
            if (obj.key == key) {
                obj.isStop = obj.isStop == true ? false : true
            }
        })

    }


    setInterval(() => {
        if (!isAllStop) {
            //1) 리스트 초기화
            removeAllList();
            //2) 남은시간으로 차감 
            pungList.forEach((obj) => {
                if (obj.isStop) {
                    return;
                }
                obj.time = obj.time - 1000;
            });
            //3) 시간에 도달한 것 필터링 
            pungList = pungList.filter((obj) => {
                return obj.time > 0
            });
            //4) 내림차순정렬
            pungList.sort((a, b) => {
                if (a.time > b.time) return -1;
                if (a.time === b.time) return 0;
                if (a.time < b.time) return 1;
                return 0;
            })

            pungList.forEach((obj) => {
                let li = document.createElement("li");

                li.setAttribute("id", (<string><unknown>obj.key));
                const text = document.createTextNode(obj.contentValue.concat(" :", (obj.time / 1000).toString(), "초"));
                li.appendChild(text);

                const delButton = document.createElement('button');
                delButton.id = "deleteItem";
                delButton.innerText = "삭제";
                delButton.addEventListener('click', deleteItem.bind(null, obj.key))
                li.appendChild(delButton);

                const stopButton = document.createElement('button');
                stopButton.id = "stopItem";
                stopButton.addEventListener('click', stopItem.bind(null, obj.key))
                obj.isStop == true ? stopButton.innerText = "시작" : stopButton.innerText = "중지"
                li.appendChild(stopButton);

                list.appendChild(li);

            })
        }

    }, 1000);


}

main();