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
</template>

<script>
import { date } from 'quasar'; //import
import { nextTick } from 'vue';
import { debounce } from 'lodash';

export default {
    name:'VueEx',
    components:{},
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
        }
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
                const timeStamp = Date.new();
                const formattedString = date.formatDate(timeStamp, "YYYY-MM-DD HH:mm:ss");
                this.str = formattedString;
            }, 1000);
            return this.str; //바인딩되는 변수 필요
        }
    },
}
</script>

<style>

</style>