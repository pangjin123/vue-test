<template class="q-pa-md q-gutter-md">
    <!-- 템플릿 문법 -->
    <q-card-section>Message: {{ msg }}</q-card-section>
    <q-separator />
    <!-- 텍스트 출력 -->
    <q-card-section>Using text interpolation: {{ rawHtml }} </q-card-section>
    <q-card-section>Using V-html directive: <span v-html="rawHtml"></span></q-card-section>
    <q-separator />
    <!-- 버튼 -->
    <q-btn
        unelevated
        color="primary"
        type="a"
        target="_blank"
        v-bind:id="linkId"
        v-bind:href="link.to"
        :title="link.title"
        :label="link.label"
    ></q-btn>
    <q-separator />
    <!-- 불리언 속성 -->
     <q-card-section>
        <q-btn :disable="isButtonDisabled" label="버튼 보이기"></q-btn>
    </q-card-section>
    <q-separator />
    <!-- JavaScript 표현식 사용 -->
    <q-card-section> {{ number + 1 }} </q-card-section>
    <q-separator />
    <q-card-section> {{ ok ? "YES" : "NO" }} </q-card-section>
    <q-separator />
    <q-card-section> {{ message.split("").reverse().join("") }}</q-card-section>
    <q-separator />
    <q-card-section :id="`list-${id}`"> list-{{ id }} </q-card-section>
    <q-separator />
    <!-- 함수 호출 -->
    <q-card-section class="text-h6"> {{ calculateDate() }} </q-card-section>
    <q-separator />
    <!-- 디렉티브 (v- 접두사)-->
    <q-card-section v-if="!seen"> Now tou see me </q-card-section>
    <q-card-section v-else> on no! </q-card-section>
    <q-separator />
    <q-btn @click="awesome = !awesome" label="toggle"></q-btn>
    <q-card-section v-if="awesome">Vue is awesome! </q-card-section>
    <q-card-section v-else> on no! </q-card-section>
    <q-separator />
    <q-card-section v-if="type == 'A'">A</q-card-section>
    <q-card-section v-else-if="type == 'B'">B</q-card-section>
    <q-card-section v-else-if="type == 'C'">C</q-card-section>
    <q-card-section v-else>Not A/B/C</q-card-section>
    <q-separator />

    <!-- 메서드 선언 (컴포넌트 인스턴스) -->
    <div class="q-pa-md row items-start">
        <q-btn @click="increment" label="카운트" color="primary"></q-btn>
        <q-card-section>methodCount is: {{ methodCount }}</q-card-section>
    </div>
    <q-separator />

    <q-card-section>
        <q-input v-model="inputData"
        outlined
        bottom-slots
        label="DebounceEx"
        counter
        :dense="true"
        />
    </q-card-section>
    <q-separator />

    <!-- 계산된 속성 생성과 동일한 메소드 생성 -->
    <q-card-section>책을 가지고 있다: {{ publishedBooksMessage }}</q-card-section>
    <q-separator />
    <q-card-section>책을 가지고 있다: {{ calculateBooksMessage() }}</q-card-section>
    <q-separator />

    <!-- computed와 메소드중  computed는 업데이트 되지 않는다 -->
    <q-card-section class="text-h6">
        {{ toTitleDate }}
        {{ calculateDate() }}
    </q-card-section>
    <q-separator />

    <!-- 계산된 속성을 이용하여 getter와 setter를 모두 제공하는 속성을 만듬-->
    <q-card-section class="text-h6">
        {{fullName}}
    </q-card-section>
    <q-separator />

    <!-- 객체로 바인딩하기 -->
    <q-card-section :class="{active:isActive, 'text-h3': hasError}">객체로 바인딩1</q-card-section>
    <q-card-section :class="classObject">객체로 바인딩2</q-card-section>
    <q-separator />

    <!-- 계산된 속성으로 바인딩 -->
    <q-card-section :class="classobj">계산된 속성으로 바인딩</q-card-section>

    <!-- 배열로 바인딩 -->
    <q-card-section :class="[activeClass, errorClass]">배열로 바인딩</q-card-section>
    <q-card-section :class="[isActive ? activeClass : ' ', errorClass]"> 삼항 표현식 클래스 토글 </q-card-section>
    <q-separator />

    <!-- 인라인 스타일 바인딩 객체 -->
    <q-card-section :style="styleObject">인라인 스타일 바인딩 객체</q-card-section>

    <!-- 인라인 스타일 바인딩 배열 -->
    <q-card-section :style="[baseStyles, overridingStyles]"> 인라인 스타일 바인딩 배열</q-card-section>
    <q-separator />

    <!-- v-if-else -->
    <q-btn @click="awesome = !awesome" label="버튼"></q-btn>
    <q-card-section v-if="awesome"> Vue is awesome! </q-card-section>
    <q-card-section v-else> on no! </q-card-section>
    <q-separator />

    <!-- v-else-if -->
    <q-card-section v-if="type == 'A'"> A </q-card-section>
    <q-card-section v-else-if="type === 'B'"> B </q-card-section>
    <q-card-section v-else-if="type === 'C'"> C </q-card-section>
    <q-card-section v-else> Not A/B/C </q-card-section>
    <q-separator />

    <!-- template에서 v-if -->
    <div class="q-pa-md row items-start q-gutter-md">
        <q-card v-if="v_if_ok" dark bordered class="bg-grey-9 my-card">
            <q-card-section>
                <div class="text-h6">Our changing Planet</div>
                <div class="text-subtitle2">by John Doe</div>
            </q-card-section>
            <q-separator dark inset />
            <q-card-section>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                tempor incididunt ut labore et dolore magna aliqua.
            </q-card-section>
        </q-card>
    </div>

    <!-- v-show -->
    <div class="q-pa-md row items-start q-gutter-md">
        <q-card
            v-show="ok"
            dark
            bordered
            class="my-card text-white"
            style="background: radial-gradient(circle, #35a2ff 0%, #014a88 100%)"
        >
            <q-card-section>
                <div class="text-h6"> Our Changing Planet</div>
                <div class="text-subtitle2">by John Doe</div>
            </q-card-section>
            <q-separator dark inset />
            <q-card-section>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                tempor incididunt ut labore et dolore magna aliqua.
            </q-card-section>
        </q-card>
    </div>
    <q-separator />

    <!-- v-for -->
    <div class="q-pa-md">
        <q-lkist v-for="(item, idx) in listItems" :key="idx" bordered separator>
            <q-item clickable v-ripple>
                <q-item-section>{{ idx + 1 }}. {{ item.message }}</q-item-section>
            </q-item>
        </q-lkist>
    </div>
    <q-separator />

    <!-- v-for JavaScript -->
    <div class="q-pa-md">
        <q-list v-for="(item, index) of tupleListItems" :key="index" bordered separator>
            <q-item clickable v-ripple>
                <q-item-section v-for="(childItem, index) in item.children" :key="index">
                    <q-item-section>{{ item.message }} - {{ childItem }}</q-item-section>
                </q-item-section>
            </q-item>
         </q-list>
    </div>
    <q-separator />

    <!-- v-for 객체에 사용하기 -->
    <div class="q-pa-md">
        <q-list
            v-for="(value, key, index) in myObject"
            :key="index"
            bordered
            separator
        >
            <q-item clickable v-ripple>
                <q-item-section>
                    {{ index + 1}}. {{ key }} : {{ value }} 
                </q-item-section>
            </q-item>
        </q-list>
    </div>
    <q-separator />

    <!-- v-for 정수 사용하기 -->
    <div class ="q-pa-md row items-start">
        <q-list v-for="n in 10" :key="n" bordered separator>
            <q-item clickable v-ripple>
                <q-item-section> {{ n }} </q-item-section>  <!-- n은 1부터 시작 -->
            </q-item>
        </q-list>
    </div>
    <q-separator />

    <!-- 컴포넌트에 v-for 사용하기 -->
    <div class="q-pa-md items-start">
        <my-component
            v-for="(item, index) in listItems"
            :key="index"
            :item="item"
            :index="index"
        ></my-component>
    </div>
    <q-separator />

    <!-- 배열 교체 -->
    <q-card-section>{{ filterItems }}</q-card-section>
    <q-separator />

    <!-- 필터 -->
    <q-list v-for="n in evenNumbers" :key="n" bordered separator>
        <q-item clickable v-ripple>
            <q-item-section> {{ n }} </q-item-section>
        </q-item>
    </q-list>
    <q-separator />

    <!-- 필터링2 -->
    <q-list v-for="(numbers, index) in sets" :key="index" bordered separator>
        <q-item v-for="n in even(numbers)" :key="n" clickable v-ripple>
            <q-item-section><q-item-label class="text-h6 text-weight-bolder text-center">{{ n }}</q-item-label></q-item-section>
        </q-item>
    </q-list>
    <q-separator />
    
    <!-- 인라인 핸들러 -->
    <div class="q-pa-md row items-start">
        <q-btn @click="count++" label="카운트" color="primary"></q-btn>
        <q-card-section>Count is: {{ count }}</q-card-section>
    </div>
    <q-separator />

    <!-- 메서드 핸들러 -->
    <div class="q-pa-md row items-start">
        <q-btn
            @click="greet"  
            label="treet"
            color="secondary"
            class="q-ma-sm">
        </q-btn>
        <!-- 동작안하는 버튼 -->
        <q-btn label="Alert" color="primary" @click="alert" class="q-ma-sm" />
        <q-btn label="Confirm" color="primary" @click="confirm" class="q-ma-sm" />
        <q-btn label="Prompt" color="primary" @click="prompt" class="q-ma-sm" />
    </div>
    <q-separator />

    <!-- 인라인 핸들러에서 메서드 호출하기 -->
    <div class="q-pa-md row items-start">
        <q-btn
            @click="say('안녕')"
            label="안녕이라고 말히기"
            color="blue"
            class="q-ma-sm">
        </q-btn>
        <q-btn
            @click="say('잘가')"
            label="잘가라고 말하기"
            color="blue"
            class="q-ma-sm">
        </q-btn>
    </div>
    <q-separator />

    <!-- 인라인 핸들러에서 이벤트 객체 접근하기 -->
    <div class="q-pa-md row items-start">
        <q-btn
            @click="warn('아직 양식을 제출할 수 없습니다.', $event)"
            label="아직 양식을 제출할 수 없습니다."
            color="secondary"
            class="q-ma-sm">
        </q-btn>
        <q-btn
            @click="(event) => warn('아직 양식을 제출할 수 없습니다1.', event)"
            label="아직 양식을 제출할 수 없습니다1"
            color="secondary"
            class="q-ma-sm">
        </q-btn>
    </div>
    <q-separator />

    <!-- 이벤트 수식어 -->
    <div class="q-pa-md row items-start">
        <!-- 클릭 이벤트 전파가 중지됩니다. -->
        <q-btn label="stop" color="primary" @click.stop="doThis" class="q-ma-sm" />
        <!-- submit 이벤트가 더 이상 페이지 리로드하지 않습니다. -->
        <q-form
            label="prevent"
            color="primary"
            @submit.prevent="doThis"
            class="q-ma-sm">
            <q-input v-model="name" />
            <q-btn label="submit" type="submit"></q-btn>
        </q-form>
        <!-- 수식어를 연결할 수 있습니다. -->
        <q-btn
            label="stopPrevent"
            color="primary"
            @click.stop.prevent="doThis()"
            class="q-ma-sm"/>
        <!-- 이벤트에 핸들러 없이 수식어만 사용할 수 있습니다. -->
        <q-form
            label="prevent"
            color="primary"
            @submit.prevent
            class="q-ma-sm">
            <q-input v-model="name" />
            <q-btn label="submit" type="submit"></q-btn>
        </q-form>
        <!-- event.target이 엘리먼트 자신일 경우에만 핸들러가 실행됩니다. -->
        <!-- 예를 들어 자식 엘리먼트에서 클릭 액션이 있으면 핸들러가 실행되지 않습니다. -->
        <q-btn label="self" color="primary" @click.self="doThis" class="q-ma-sm" />
    </div>
    <q-separator />

    <!-- Form 입력 바인딩 -->
</template>

<script>
import { date } from 'quasar'; //import
import { nextTick } from 'vue';
import { debounce } from 'lodash';
import MyComponent from '../components/MyComponent.vue';


export default {
    name:'VueEx',
    components:{ MyComponent },
    title: "Vue Basic",
    data(){
        return{     //변수 선언
            msg: "hello Vue",   //텍스트

            rawHtml: `<span style="color: red">빨간색이어야 합니다.</span>`,    //문법
            linkId: "vue",
            link: {     //링크
                to: "http://vuejs.org",
                title: "뷰 공식 사이트",
                label: "Vuejs.org",
            },

            isButtonDisabled: false,    //불리언 속성 버튼

            ok: true,
            number: 1000,
            message:
                "지금까지 템플릿의 단순한 속성만 있었습니다. 그러나 Vue는 실제로 모든 데이터가 내에서 JavaScript 강화의 모든 기능을 지원합니다.",
            id: "genie",

            seen: true,     //디렉티브 변수
            awesome: true,
            type: "B",


            methodCount: 1,     //메서드 (카운트 변수)

            obj: {
                nested: { count: 0 },
                arr: ['foo', 'bar']
            },

            inputData:'',

            author: {   //책을 갖고 있다는 변수
                name: 'John Doe',
                books: [
                    'Vue 2 - Advanced Guide',
                    'Vue 3 - Basic Guide',
                    'Vue 4 - The Mystery'
                ]
            },

            str:'',

            firstName: 'John',
            lastName: 'Doe',

            isActive: true,
            hasError: false,

            classObject: {
                active: true,
                'text-h3': false
            },

            isActive2: true,
            error: null,

            activeClass: 'active',
            errorClass: 'text-danger',

            styleObject: {  //텍스트 스타일
                color: 'red',
                fontSize: '13px',
            },
            
            baseStyles: {   //빨간 밑줄
                textDecorationLine: 'underline',
                textDecorationThickness: '5px',
                textDecorationColor: 'red',
            },
            overridingStyles:{  //텍스트 스타일
                color:'blue',
                fontSize:'35px',
            },

            awesome: true,  //v-if

            type: "B",  //v-else-if

            v_if_ok: true,  //template에서 v-if

            listItems: [{ message: "Foo"}, {message: "Bar" }],  //v-for

            tupleListItems: [{ message: "Foo", children:["baby"]}, {message: "Bar", children:['child'] }],  //v-for JavaScript

            myObject: {     //v-for 객체 사용
                title: 'Vue에서 목록을 작성하는 방법',
                author: '홍길동',
                publishedAt: '2016-04-10'
            },

            items: [{ message: "Foo" }, { message: "Bar" }], //배열 교체

            numbers: [1, 2, 3, 4, 5],   //필터링

            sets: [[ 1, 2, 3, 4, 5], [6, 7, 8, 9, 10]], //필터링2

            count: 0,   //인라인 핸들러

            name: "Vue.js",
        }
        //표현식이 아닌 선언식
        {{ var a = 1}}
        {{ if(ok) { return message } }}
    },
    computed:{
        //계산된 값을 반환하는 속성
        publishedBooksMessage() {
            return this.author.books.length > 0? 'Yes' : 'No'
        },

        toTitleDate() {
            const timeStamp = Date.now();
            const formattedString = date.formatDate(timeStamp, "YYYY-MM-DD HH:mm");
            return formattedString;
        },
        fullName: {
            //getter
            get() {
                return this.firstName + ' ' + this.lastName
            },
            //setter
            set(newValue) {
                [this.firstName, this.lastName] = newValue.split('')
            }
        },
        classObj() {
            return {
                active : this.isActive2 && !this.error,
                'text-h3': this.error && this.error.type === 'fatal'
            }
        },
        filterItems() {
            return (this.items = this.items.filter((item) =>
                item.message.match(/Foo/)
            ));
        },

        evenNumbers() {     //필터링1
            return this.numbers.filter(n => n % 2 === 0)
        },
    },
    watch:{
        inputData: debounce(function(newVal, oldVal) {
            console.log(newVal, oldVal);    //처리 로직
        }, 500)
    },
    created() {     //각 인스턴스는 자체적인 디바운스 핸들러를 가짐
        this.debouncedClick = _.debounce(this.click, 500)
    },
    unmounted() {
        this.debouncedClick.cancel()
    },
    mounted(){  //생명 주기 훅
        console.log(this.methodCount)   //=> 1

        this.methodCount= 2
        console.log(this.methodCount)   //=> 2

        this.increment()

        this.error = {};
        this.error.type = 'fatal';
    },
    methods:{
        calculateDate() {   //함수 선언
            const timeStamp = Date.now();
            const formattedString = date.formatDate(timeStamp, "YYYY-MM-DD HH:mm");
            return formattedString;
        },
        increment() {
            this.count++
            nextTick(() => {    //DOM 업데이트 발생을 기다리는 유틸리티
                this.methodCount++
                console.log('methodCount', this.methodCount);
            })
        },
        mutateDeeply() {
            this.obj.nested.count++
            this.obj.arr.push('baz')
        },
        click: debounce(function() { 
            //클릭에 응답..???
        }, 500),

        calculateBooksMessage() {   //책을 갖고 있는지 물어보는 메소드
            return this.author.books.length > 0 ? 'Yes' : 'No'
        },

        calculateDate() {
            setInterval(()=> {
                const timeStamp = Date.now();
                const formattedString = date.formatDate(timeStamp, "YYYY-MM-DD HH:mm:ss");
                this.str = formattedString;
            }, 1000);
            return this.str; //바인딩되는 변수 필요
        },

        even(numbers) {     //필터링2
            return numbers.filter(number => number % 2 === 0)
        },

        greet(e) {      //메서드 핸들러
            this.$q.notify({
                message: `hello ${this.name}!`,
                caption: "5 minutes ago",
                color: "blue",
            });
        },
        say(message) {  //인라인 핸들러에서 메서드 호출
            alert(message)
        },
        warn(message, event) {  //인라인 핸들러에서 이벤트 객체 접근하기
            if(event) {
                event.preventDefault();
                this.$q.dialog({
                    title: "Alert",
                    message: `${message}`,
                })
                .onOk(() => {

                })
                .onCancel(() => {

                })
                .onDismiss(() => {

                });
            }
        },
        doThis(event) {     //이벤트 수식어
            console.log(event)
            this.$q.notify({
                color: "green-5",
                textColor: "white",
                icon: "warning",
                message: `doThis pointerType`,
            });
            console.log("doThis pointerType", event);
        },
        doThat(event) {     //이벤트 수식어
            this.$q.notify({
                color: "yellow-5",
                textColor: "white",
                icon: "warning",
                message:`doThat pointerType`,
            });
            console.log("doThat event", event)
        },
    },
}
</script>

<style scoped>
    .active{
        color:red;
    }
    .my-card {
        width: 100%;
        max-width: 250px;
    }
</style>