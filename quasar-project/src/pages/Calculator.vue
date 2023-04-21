<template>
  <div class="calculator">
    <div class="display"> {{ current || '0' }}</div>
    <div @click="clear" class="btn blank">C</div>
    <div @click="percent" class="btn">%</div>
    <div @click="div" class="btn operator">/</div>
    <div @click="addnumber('7')" class="btn">7</div>
    <div @click="addnumber('8')" class="btn">8</div>
    <div @click="addnumber('9')" class="btn">9</div>
    <div @click="mul" class="btn operator">x</div>
    <div @click="addnumber('4')" class="btn">4</div>
    <div @click="addnumber('5')" class="btn">5</div>
    <div @click="addnumber('6')" class="btn">6</div>
    <div @click="sub" class="btn operator">-</div>
    <div @click="addnumber('1')" class="btn">1</div>
    <div @click="addnumber('2')" class="btn">2</div>
    <div @click="addnumber('3')" class="btn">3</div>
    <div @click="sum" class="btn operator">+</div>
    <div @click="addnumber('0')" class="btn blank">0</div>
    <div @click="dot" class="btn">.</div>
    <div @click="equal" class="btn operator">=</div>
  </div>
</template>

<script>
export default {
    data() {
        return {
            previous: null,
            current: '',
            operator: null,
            operatorClicked: false,
        }
    },
    methods: {
        clear() {   //클리어
            this.current = '';
        },
        percent() {     //퍼센트
            this.current = `${parseFloat(this.current) / 100}`
        },
        addnumber(number) {   //숫자 추가
            if (this.operatorClicked) {
                this.current = '';
                this.operatorClicked = false;
            }
            this.current = `${this.current}${number}`
        },
        dot() {     //.은 한개만 넣을 수 있게
            if (this.current.indexOf('.') === -1 ){
                this.addnumber('.');
            }
        },
        setPrevious() {
            this.previous = this.current;
            this.operatorClicked = true;
        },
        div() {     //나누기
            this.operator = (a,b) => a/b;
            this.setPrevious();
        },
        mul() {    //곱하기
            this.operator = (a,b) => a*b;
            this.setPrevious();
        },
        sub() {   //빼기
            this.operator = (a,b) => a-b;
            this.setPrevious();
        },
        sum() {    //더하기
            this.operator = (a,b) => a+b;
            this.setPrevious();
        },
        equal() {   //결과
            this.current = `${this.operator(
                parseFloat(this.current), 
                parseFloat(this.previous)
            )}`;
            this.previous = null;
        }
    },
}
</script>

<style scoped>
.calculator {
    margin: 0 auto;
    width: 400px;
    font-size: 50px;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-auto-rows: minmax(50px, auto);
}
.display {
    grid-column: 1 / 5;
    background-color: #ffffff; 
    color: #ffbaba;
    border: 1px solid #ffbaba;
    text-align: right;
}
.blank {
    grid-column: 1/3;
}

.btn {
    background-color: #ffbaba;
    border: 1px solid #eee;
    text-align: center;
    color: white;
}

.operator {
    background-color: bisque;
    color: white;
}
</style>