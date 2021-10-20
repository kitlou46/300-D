/**
 * Created by Rychou on 2018/4/19.
 */
import React, { Component } from 'react'
import $ from 'jquery'
import url from './audio/zsjnmdr.mp3' // 引入背景音乐文件


class Main extends Component {
    state = {
        date: {},
    }
    componentDidMount() {
        this.print();
        setInterval(() => {
            this.time(2020, 12, 25) // 你们的纪念日
        }, 1000
        )
        var audio = document.getElementById("audio");
        setTimeout(() => audio.play(), 8500) // 背景音乐在页面加载后，延迟播放的时长，单位：毫秒。
    }
    print = () => {
        $.fn.autotype = function () {
            var _this = $(this);
            var str = _this.html();
            // 正则替换代码行之间添加的多个空格，不去除换行输出会有明显的停顿：实际是在输出多个空格
            str = str.replace(/(\s){2,}/g, "$1");
            var index = 0;
            $(this).html('');
            var timer = function fn() {
                var args = arguments;
                var current = str.slice(index, index + 1);
                // html标签完整输出,如：<p>
                if (current == '<') {
                    index = str.indexOf('>', index) + 1;
                }
                else {
                    index++;
                }
                //位运算符: 根据setInterval运行奇偶次来判断是否加入下划线字符“_”，使输入效果更逼真
                if (index < str.length - 1) { //打印字符倒数第2个字符开始，不加下划线字符，以防止结束符可能会多输出一下划线字符
                    _this.html(str.substring(0, index) + (index & 1 ? '_' : ''));
                } else {
                    _this.html(str.substring(0, index));
                    clearTimeout(timer);
                };
                setTimeout(fn, 200)
            };
            // 延迟1s开始
            setTimeout(timer, 1000);
        };
        $("#autotype").autotype();
    }
    time = (year, month, day) => {
        var dateNow = new Date();
        var dateJNR = new Date(year, month - 1, day);
        // var anniversary = parseInt((dateNow - dateJNR) / (365*24*3600*1000))
        var d = parseInt((dateNow - dateJNR) / (24 * 3600 * 1000));
        var hour = parseInt(((dateNow - dateJNR) / (3600 * 1000)) % 24);
        var minute = parseInt((dateNow - dateJNR) / (1000 * 60) % 60);
        var second = parseInt((dateNow - dateJNR) / 1000 % 60);
        this.setState({ date: { d: d, hour: hour, minute: minute, second: second } });
    };
    render() {
        const date = () => {
            if (this.state.date.d !== undefined) {
                const { d, hour, minute, second } = this.state.date
                return (<p>我们已经一起走过了: <span className="date-text">{d}</span> 天 <span className="date-text">{hour}</span> 小时 <span className="date-text">{minute}</span> 分 <span className="date-text">{second}</span> 秒 </p>
                )
            }
        }
        return (
            <div className="App animated bounceInLeft">
                <div className="date">{date()}</div>
                <div id="autotype">
                    <h1 style={{ fontWeight: 900 }}>To my dear babe, Charmaine! ᶘ ᵒ㉨ᵒᶅ</h1>
                    <p >选了一首你喜欢的歌来当背景音乐了。3...2...1...GO!</p>
                    <p>不知不觉来到了在一起的第300天了，主要是疫情的关系感觉时间在飞逝，还是有种还未到100天的感觉呢（笑。
                    虽然觉得可惜是因为也没见上几（十）次面，后来发现...其实影响也不大？</p>
                    <p>因为我们有了比其他人更长的适应期来了解彼此，加深感情依靠的同时也在慢慢地步入“迟来”的热恋期当中，是少见的情况呢（笑。
                        在这段适应期当中，有过的争吵和不理解还有误会，虽然是感情里的酸苦辣，后劲的甘甜却是一种relief。
                        感谢你在这酸甜苦辣的时刻一直都在，愿意为我操心，担心我，牵挂我，喜欢我/不喜欢我（？，闹我，还有，爱我。
                        我都有看在心里嘿(￣︶￣)。
                </p>
                    <p>感受着你一天天地与我亲近起来，在这近些年日复一日的日子里，添加了一份满满的期待感，还有...幸福感。
                </p>
                    <p>300天の纪念日要快乐哦！（虽然感觉到了小脾气（小声bb</p>
                    <div style={{ textAlign: 'right' }}>
                        <p>爱你哟！~</p>
                        <p>2021年10月20日，以上！陈吉思旻笔！</p>
                    </div>
                </div>
                <audio id="audio" src={url}></audio>
            </div>

        )
    }
}
export default Main
