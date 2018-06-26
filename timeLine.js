// 定制缩放比例及缩放的宽度
let zoomTree = [
    {},
    { unit: "d", width: 35000, level: 1, label: "30 minutes" },
    { unit: "d", width: 17600, level: 2, label: "1 hour" },
    { unit: "d", width: 8800, level: 3, label: "2 hours" },
    { unit: "d", width: 4400, level: 4, label: "5 hours" },
    { unit: "d", width: 2200, level: 5, label: "10 hours" },
    { unit: "d", width: 1100, level: 6, label: "1 DAY" },
    { unit: "d", width: 550, level: 7, label: "40 hours" },
    { unit: "d", width: 432, level: 8, label: "2 days" },
    { unit: "d", width: 343, level: 9, label: "2.5 days" },
    { unit: "d", width: 272, level: 10, label: "3 days" },
    { unit: "d", width: 216, level: 11, label: "4 days" },
    { unit: "d", width: 171, level: 12, label: "5 days" },
    { unit: "d", width: 136, level: 13, label: "1 WEEK" },
    { unit: "d", width: 108, level: 14, label: "8 days" },
    /* 108 * 30 = equiv to a 3240 month */
    { unit: "M", width: 2509, level: 15, label: "10 days" },
    { unit: "M", width: 1945, level: 16, label: "2 WEEKS" },
    { unit: "M", width: 1508, level: 17, label: "18 days" },
    { unit: "M", width: 1169, level: 18, label: "3 weeks" },
    { unit: "M", width: 913, level: 19, label: "1 MONTH" },
    { unit: "M", width: 719, level: 20, label: "5 weeks" },
    { unit: "M", width: 566, level: 21, label: "6 weeks" },
    { unit: "M", width: 453, level: 22, label: "2 MONTHS" },

    { unit: "M", width: 362, level: 23, label: "10 weeks" },
    { unit: "M", width: 290, level: 24, label: "3 MONTHS" },
    { unit: "M", width: 232, level: 25, label: "4 months" },
    { unit: "M", width: 186, level: 26, label: "5 months" },
    { unit: "M", width: 148, level: 27, label: "6 MONTHS" },
    { unit: "M", width: 119, level: 28, label: "7 months" },
    { unit: "M", width: 95, level: 29, label: "9 months" },
    { unit: "M", width: 76, level: 30, label: "1 YEAR" },
    /* 76 * 12 = equiv to a 912 year */
    { unit: "y", width: 723, level: 31, label: "15 months" },
    { unit: "y", width: 573, level: 32, label: "18 months" },
    { unit: "y", width: 455, level: 33, label: "2 YEARS" },
    { unit: "y", width: 361, level: 34, label: "2.5 years" },
    { unit: "y", width: 286, level: 35, label: "3 years" },
    { unit: "y", width: 227, level: 36, label: "4 years" },
    { unit: "y", width: 179, level: 37, label: "5 years" },
    { unit: "y", width: 142, level: 38, label: "6 years" },
    { unit: "y", width: 113, level: 39, label: "8 years" },
    { unit: "y", width: 89, level: 40, label: "10 years" },
    { unit: "de", width: 705, level: 41, label: "13 years" },
    { unit: "de", width: 559, level: 42, label: "16 years" },
    { unit: "de", width: 443, level: 43, label: "20 years" },

    { unit: "de", width: 302, level: 44, label: "25 years" },
    { unit: "de", width: 240, level: 45, label: "30 years" },
    { unit: "de", width: 190, level: 46, label: "40 years" },
    { unit: "de", width: 150, level: 47, label: "50 years" },
    { unit: "de", width: 120, level: 48, label: "65 years" },
    { unit: "de", width: 95, level: 49, label: "80 years" },
    { unit: "de", width: 76, level: 50, label: "100 YEARS" },
    { unit: "ce", width: 600, level: 51, label: "130 years" },
    { unit: "ce", width: 480, level: 52, label: "160 years" },
    { unit: "ce", width: 381, level: 53, label: "200 YEARS" },
    { unit: "ce", width: 302, level: 54, label: "250 years" },
    { unit: "ce", width: 240, level: 55, label: "300 years" },
    { unit: "ce", width: 190, level: 56, label: "400 years" },
    { unit: "ce", width: 150, level: 57, label: "500 YEARS" },
    { unit: "ce", width: 120, level: 58, label: "600 years" },
    { unit: "ce", width: 95, level: 59, label: "1000 YEARS" },
    { unit: "ce", width: 76, level: 60, label: "1100 years" },
    { unit: "thou", width: 603, level: 61, label: "1500 years" },

    { unit: "thou", width: 478, level: 62, label: "2000 years" },
    { unit: "thou", width: 379, level: 63, label: "2500 years" },
    { unit: "thou", width: 301, level: 64, label: "3000 years" },
    { unit: "thou", width: 239, level: 65, label: "4000 years" },
    { unit: "thou", width: 190, level: 66, label: "5000 YEARS" },
    { unit: "thou", width: 150, level: 67, label: "6000 years" },
    { unit: "thou", width: 120, level: 68, label: "7500 years" },
    { unit: "thou", width: 95, level: 69, label: "10,000 YEARS" },
    { unit: "thou", width: 76, level: 70, label: "12,000 years" },
    { unit: "tenthou", width: 603, level: 71, label: "15,000 years" },
    { unit: "tenthou", width: 358, level: 72, label: "25,000 years" },
    { unit: "tenthou", width: 213, level: 73, label: "40,000 years" },
    { unit: "tenthou", width: 126, level: 74, label: "70,000 years" },
    { unit: "tenthou", width: 76, level: 75, label: "100,000 YEARS" },
    { unit: "hundredthou", width: 603, level: 76, label: "150,000 years" },
    { unit: "hundredthou", width: 358, level: 77, label: "250,000 years" },
    { unit: "hundredthou", width: 213, level: 78, label: "400,000 years" },
    { unit: "hundredthou", width: 126, level: 79, label: "700,000 years" },
    { unit: "hundredthou", width: 76, level: 80, label: "1 million years" },
    { unit: "mill", width: 603, level: 81, label: "1.5 million years" },
    { unit: "mill", width: 358, level: 82, label: "3 million years" },
    { unit: "mill", width: 213, level: 83, label: "4 million years" },
    { unit: "mill", width: 126, level: 84, label: "6 million years" },
    { unit: "mill", width: 76, level: 85, label: "10 million years" },
    { unit: "tenmill", width: 603, level: 86, label: "15 million years" },
    { unit: "tenmill", width: 358, level: 87, label: "25 million years" },
    { unit: "tenmill", width: 213, level: 88, label: "40 million years" },
    { unit: "tenmill", width: 126, level: 89, label: "70 million years" },
    { unit: "tenmill", width: 76, level: 90, label: "100 million years" },
    { unit: "hundredmill", width: 603, level: 91, label: "120 million years" },
    { unit: "hundredmill", width: 358, level: 92, label: "200 million years" },
    { unit: "hundredmill", width: 213, level: 93, label: "300 million years" },
    { unit: "hundredmill", width: 126, level: 94, label: "500 million years" },
    { unit: "hundredmill", width: 76, level: 95, label: "1 billion years" },
    { unit: "bill", width: 603, level: 96, label: "15 million years" },
    { unit: "bill", width: 358, level: 97, label: "30 million years" },
    { unit: "bill", width: 213, level: 98, label: "50 million years" },
    { unit: "bill", width: 126, level: 99, label: "80 million years" },
    { unit: "bill", width: 76, level: 100, label: "100 billion years" }
];
for (let z = 1; z < zoomTree.length; z++) {
    let zl = zoomTree[z];
    let sec = 0;
    switch (zl.unit) {
        case "d":
            sec = 86400;
            break;
        case "M":
            sec = 2419200;
            break; // assumes only 28 days per
        case "y":
            sec = 31536000;
            break;
        case "de":
            sec = 315360000;
            break;
        case "ce":
            sec = 3153600000;
            break;
        case "thou":
            sec = 31536000000;
            break;
        case "tenthou":
            sec = 315360000000;
            break;
        case "hundredthou":
            sec = 3153600000000;
            break;
        case "mill":
            sec = 31536000000000;
            break;
        case "tenmill":
            sec = 315360000000000;
            break;
        case "hundredmill":
            sec = 3153600000000000;
            break;
        case "bill":
            sec = 31536000000000000;
            break;
    }
    // generate hash for seconds per pixel
    zl.spp = Math.round(sec / parseInt(zl.width));
}
//月份缩写
let monthNamesAbbr = ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月", ""]
// let monthNamesLet = ["", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"]
let monthNamesLet = ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月", ""]

/**
 * 画出均匀的y轴坐标 返回[坐标最大值,坐标最小值,刻度个数]
 * @param {*} cormax 数据最大值 
 * @param {*} cormin 数据最小值
 * @param {*} cornumber 刻度个数
 */
function standard(cormax, cormin, cornumber) {
    let tmpmax, tmpmin, corstep, tmpstep, tmpnumber, temp, extranumber;
    if (cormax <= cormin)
        return;
    corstep = (cormax - cormin) / cornumber;
    if (Math.pow(10, parseInt(Math.log(corstep) / Math.log(10))) == corstep) {
        temp = Math.pow(10, parseInt(Math.log(corstep) / Math.log(10)));
    } else {
        temp = Math.pow(10, (parseInt(Math.log(corstep) / Math.log(10)) + 1));
    }
    tmpstep = (corstep / temp).toFixed(6);
    //选取规范步长
    if (tmpstep >= 0 && tmpstep <= 0.1) {
        tmpstep = 0.1;
    } else if (tmpstep >= 0.100001 && tmpstep <= 0.2) {
        tmpstep = 0.2;
    } else if (tmpstep >= 0.200001 && tmpstep <= 0.25) {
        tmpstep = 0.25;
    } else if (tmpstep >= 0.250001 && tmpstep <= 0.5) {
        tmpstep = 0.5
    } else {
        tmpstep = 1;
    }
    tmpstep = tmpstep * temp;
    if (parseInt(cormin / tmpstep) != (cormin / tmpstep)) {
        if (cormin < 0) {
            cormin = (-1) * Math.ceil(Math.abs(cormin / tmpstep)) * tmpstep;
        } else {
            cormin = parseInt(Math.abs(cormin / tmpstep)) * tmpstep;
        }

    }
    if (parseInt(cormax / tmpstep) != (cormax / tmpstep)) {
        cormax = parseInt(cormax / tmpstep + 1) * tmpstep;
    }
    tmpnumber = (cormax - cormin) / tmpstep;
    if (tmpnumber < cornumber) {
        extranumber = cornumber - tmpnumber;
        tmpnumber = cornumber;
        if (extranumber % 2 == 0) {
            cormax = cormax + tmpstep * parseInt(extranumber / 2);
        } else {
            cormax = cormax + tmpstep * parseInt(extranumber / 2 + 1);
        }
        cormin = cormin - tmpstep * parseInt(extranumber / 2);
    }
    cornumber = tmpnumber;
    return [cormax, cormin, cornumber];
}

/**
 * 获取事件中的最大最小值
 * @param {*} eventArr 事件arr 
 */
function getMinAndMax(eventArr) {
    let min = null,
        max = null;
    eventArr.forEach(obj => {
        if (min === null) {
            min = obj.data
        }
        if (max === null) {
            max = obj.data
        }
        if (obj.data > max) {
            max = obj.data
        }
        if (obj.data < min) {
            min = obj.data
        }
    })
    return {
        max,
        min
    }
}

class TimeLine {
    constructor(opt, event) {
        let _opt = {
            // canvas:{},
            minZoom: 6,
            maxZoom: 40,
            xAxisH: 40,
            borderRight: 40,
            borderTop: 40,
            borderleft: 40,
            zoom: 24,
            time: new Date().getTime()
        };
        this.opt = Object.assign({}, _opt, opt);
        //画图参数
        this.canvas = this.opt.canvas;
        this.canvasW = this.canvas.getBoundingClientRect().width;
        this.canvasH = this.canvas.getBoundingClientRect().height;
        this.ctx = this.canvas.getContext("2d");
        //event 参数
        this.event = Object.assign([], event)


        //y轴坐标信息
        if (this.event.length > 0) {
            let { min, max } = getMinAndMax(this.event)
            this.scaleY = standard(max, min, 5)
        } else {
            this.scaleY = [5, 0, 5]
        }

        this.listener = []//钩子函数
        this.isMousedown = false; //拖动mousedown标记
        this.isMousemove = false; //拖动mousemove标记
        this.mousedownCursor = null; //拖动mousedown的位置
        this.returnTime = null; //mouseup返回时间
        this.clickX = null;//点击事件x坐标
        this.clickY = null;//点几事件y坐标
        this.clickTrigger = false;//记录上一次click事件有没有发出去
        this.render();
        this.canvas.addEventListener('mousewheel', this.mousewheelFunc.bind(this));
        this.canvas.addEventListener('mousedown', this.mousedownFunc.bind(this));
        this.canvas.addEventListener('mousemove', this.mousemoveFunc.bind(this));
        this.canvas.addEventListener('mouseup', this.mouseupFunc.bind(this));
        this.canvas.addEventListener('mouseout', this.mouseoutFunc.bind(this));
        this.canvas.addEventListener("click", this.mouseClickFunc.bind(this))
    }

    /**
     * 鼠标滚轮缩放
     * @param {*} event 
     */
    mousewheelFunc(event) {
        this.clickX = null;
        this.clickY = null;
        if (event && event.preventDefault) {
            event.preventDefault()
        } else {
            window.event.returnValue = false;
            return false;
        }

        let e = window.event || event;
        let delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));
        if (delta < 0) {
            this.opt.zoom++;
            if (this.opt.zoom >= this.opt.maxZoom) {
                this.opt.zoom = this.opt.maxZoom;
            }
        } else if (delta > 0) {
            this.opt.zoom--;
            if (this.opt.zoom <= this.opt.minZoom) {
                this.opt.zoom = this.opt.minZoom;
            }
        }
        this.trigger("zoomChange")
        this.refresh()
    }

    /**
     * 拖动/点击 mousedown事件
     */
    mousedownFunc(e) {
        this.isMousedown = true;
        this.mousedownCursor = this.getMousePos(e).x;//记住mousedown的位置
    }
    /**
     * 拖动/鼠标hover显示 mousemove事件
     */
    mousemoveFunc(e) {

        let { x: posX, y: posY } = this.getMousePos(e)
        this.clearCanvas();
        if (this.isMousedown) { //拖动
            this.clickX = null;
            this.clickY = null;
            let diff_x = posX - this.mousedownCursor;
            this.opt.time = moment(this.opt.time).subtract(diff_x * zoomTree[this.opt.zoom]["spp"], "s").valueOf()
            this.render()
            this.isMousemove = true;
            this.mousedownCursor = posX;
        } else { //画虚线
            this.render()
            // let diff_x = posX - this.canvasW / 2 - 20;
            // if (posX > this.opt.borderleft) {
            //     this.drawLine(posX, this.opt.borderTop, posX, this.canvasH - this.opt.xAxisH, "rgb(194, 202, 215)", 1);
            //     this.drawTxt(posX, posY, moment(this.opt.time).add(diff_x * zoomTree[this.opt.zoom]["spp"], "s").format("YYYY-MM-DD hh:mm:ss"), "rgb(194, 202, 215)")
            // }
        }
    }
    /**
     * 拖动/点击 mouseup事件
     */
    mouseupFunc(e) {
        this.isMousemove = false;
        this.isMousedown = false;
    }
    /**
     * 鼠标移出隐藏时间 mouseout事件
     * @param {*} e 
     */
    mouseoutFunc(e) {
        this.refresh()
    }
    /**
     * 点击事件
     * @param {*} e 
     */
    mouseClickFunc(e) {
        this.clickTrigger = false
        let { x, y } = this.getMousePos(e)
        this.clickX = x;
        this.clickY = y;
        this.refresh()
    }

    /**
     * 获取鼠标坐标
     * @param {*} e  
     */
    getMousePos(e) {
        let rect = this.canvas.getBoundingClientRect();
        let x = e.clientX - rect.left * (this.canvas.width / rect.width);
        let y = e.clientY - rect.top * (this.canvas.height / rect.height);
        return {
            x,
            y
        }
    }



    /**
     * 渲染函数
     */
    render() {
        this.clearCanvas()
        this.drawEvent()
        this.drawGraduation()
        // this.drawEvent()
    }
    /**
     * 画刻度
     */
    drawGraduation() {
        //时间轴刻度
        let totalChunk = parseInt(this.canvasW / zoomTree[this.opt.zoom]["width"]) + 2, //总片数
            height = this.canvasH - this.opt.xAxisH, //xAxis的的起始高度
            chunkWidth = zoomTree[this.opt.zoom]["width"],
            chunkUnit = zoomTree[this.opt.zoom]["unit"],
            centerX = (this.canvasW - this.opt.borderleft) / 2 + this.opt.borderleft, //中间点
            lastLeftX = 0,//上一次左边x
            lastRightX = 0;//上一次右边x
        for (let index = 0; index < totalChunk; index++) {
            let width = chunkWidth,//当前大刻度宽度
                label,//大刻度的label
                _day,//当前大刻度的时间
                graduationX;//刻度的x坐标

            //每个大刻度时间
            if (index == 0) {
                _day = moment(this.opt.time)
            } else if (index % 2 == 0) {
                _day = moment(this.opt.time).subtract((parseInt((index + 1) / 2)), chunkUnit)
            } else {
                _day = moment(this.opt.time).add((parseInt((index + 1) / 2)), chunkUnit)
            }

            if (chunkUnit == "M") { //月份特殊处理 每月天数不一样 所以宽度不一样
                switch (_day.daysInMonth()) {
                    // 31 days
                    case 31:
                        width = Math.floor(chunkWidth + ((chunkWidth / 28) * 3));
                        break;
                    case 29: // Blasted February!
                        width = Math.floor(chunkWidth + (chunkWidth / 28));
                        break;
                    case 28:
                        width = Math.floor(chunkWidth);
                    default:// 30 days
                        width = Math.floor(chunkWidth + ((chunkWidth / 28) * 2));
                }
            }
            //开始画大刻度
            if (index == 0) { //中间偏左的刻度位置
                let reduce
                switch (chunkUnit) {
                    case "d":
                        // @4:30        4/24                30 / 1440
                        //              .1666                .0201
                        reduce = ((_day.get('hour')) / 24) + ((_day.get('minute')) / 1440)
                        graduationX = Math.ceil(centerX - reduce * width)
                        break;
                    case "M":
                        let mdn = _day.daysInMonth()
                        reduce = ((_day.get("date") - 1) / mdn) + (_day.get('hour') / (24 * mdn)) + (_day.get('minute') / (1440 * mdn))
                        graduationX = Math.ceil(centerX - reduce * width)
                        break;
                    case "y":
                        reduce = ((_day.get('month') * 30) + _day.get('date')) / 365
                        graduationX = Math.ceil(centerX - reduce * width)
                        break;
                }
                lastLeftX = graduationX;
                lastRightX = graduationX + width;
            } else if (index % 2 == 0) { //右边的刻度位置
                graduationX = Math.floor(lastLeftX - width)
                lastLeftX = graduationX;
            } else { //左边的刻度的位置
                graduationX = lastRightX
                lastRightX = Math.floor(lastRightX + width)
            }
            //拿大刻度label
            switch (chunkUnit) {
                case "y":
                    label = _day.year().toString();
                    break;
                case "M":
                    if (width < 120) {
                        label = monthNamesAbbr[_day.month()] + " " + _day.year();
                    } else {
                        label = monthNamesLet[_day.month()] + " " + _day.year();
                    }
                    break;
                case "d":
                    // COSTLY: test performance here on dragging
                    if (width < 120) {
                        label = monthNamesAbbr[_day.month()] + " " + _day.date() + ", " + _day.year();
                    } else {
                        label = monthNamesLet[_day.month()] + " " + _day.date() + ", " + _day.year();
                    }
                    break;
            }
            this.drawTxt(graduationX, (height + 25), label, "rgba(194, 202, 215,0.8)")
            this.drawLine(graduationX, height, graduationX, (height + 25), "rgb(194, 202, 215)", 1);

            //画小刻度
            let tperu,//小刻度的数量
                dist;//小刻度宽度
            switch (chunkUnit) {
                case "d":
                    tperu = 24;
                    break;
                case "M":
                    tperu = _day.daysInMonth();
                    break;
                case "y":
                    tperu = 12;
                    break;
                default: tperu = 10;
            }
            dist = width / tperu;
            if (dist > 8) {
                for (let i = 0; i < tperu; i++) {
                    let subLabel = "";
                    if (dist > 16) {
                        switch (chunkUnit) {
                            case "d":
                                let htxt = i,
                                    ampm = '',
                                    bagels = '';
                                if (dist < 16) {
                                    return "";
                                } else {
                                    if (dist > 30) {
                                        ampm = (i > 11) ? " pm" : " am";
                                        if (i > 12) {
                                            htxt = i - 12;
                                        } else if (i == 0) {
                                            htxt = 12;
                                        }
                                    } else {
                                        htxt = i
                                    }
                                }
                                bagels = (dist > 60) ? ":00" : "";
                                subLabel = htxt + bagels + ampm;
                                break;
                            case "M":
                                subLabel = i + 1;
                                break;
                            case "y":
                                if (dist > 30) {
                                    subLabel = monthNamesAbbr[i];
                                } else {
                                    subLabel = monthNamesLet[i];
                                }
                                break;
                        }
                    }
                    if (subLabel != "") {
                        this.drawTxt((graduationX + dist * i + 2), height, subLabel, "rgba(194, 202, 215,0.8)")
                    }
                    if (i != 0) {
                        this.drawLine((graduationX + dist * i), height, (graduationX + dist * i), (height + 10), "rgb(194, 202, 215)", 1);
                    }
                }
            }
        }
        //画刻度横线
        this.drawLine(this.opt.borderleft, height, this.canvasW, height, "rgb(64, 196, 255)", 2)
        //覆盖左边
        this.ctx.clearRect(0, 0, this.opt.borderleft, this.canvasH);

        //画y轴刻度
        let dis = (this.canvasH - this.opt.xAxisH - this.opt.borderTop) / this.scaleY[2]
        for (let index = 0; index <= this.scaleY[2]; index++) {
            this.drawLine(this.opt.borderleft - 10, this.canvasH - this.opt.xAxisH - index * dis, this.opt.borderleft, this.canvasH - this.opt.xAxisH - index * dis, "rgb(194, 202, 215)", 1)
            this.drawTxt(this.opt.borderleft - 12, this.canvasH - this.opt.xAxisH - index * dis, index * (this.scaleY[0] - this.scaleY[1]) / this.scaleY[2], "rgb(194, 202, 215)", "right", "middle")
        }
        //画竖度竖线
        this.drawLine(this.opt.borderleft, this.opt.borderTop, this.opt.borderleft, this.canvasH - this.opt.xAxisH, "rgb(64, 196, 255)", 2)
    }
    /**
     * 画事件
     */
    drawEvent() {
        let hasClick = false;//点击事件已经触发
        this.event.forEach(event => {
            let _x,
                _y;
            _x = (this.canvasW - this.opt.borderleft) / 2 + this.opt.borderleft - Math.floor((this.opt.time - event.time) / 1000 / zoomTree[this.opt.zoom]["spp"])
            _y = this.canvasH - this.opt.xAxisH - (event.data / this.scaleY[0] * (this.canvasH - this.opt.xAxisH - this.opt.borderTop))

            this.drawPoint(_x, _y, 4, "rgb(194, 202, 215)");
            let dx = this.clickX - _x;
            let dy = this.clickY - _y;
            let dis = Math.sqrt(dx * dx + dy * dy);
            if (dis < 4 && hasClick === false) {
                this.drawTxt(_x + 6, _y + 6, `数值:${event.data}`, "rgb(194, 202, 215)")
                this.drawTxt(_x + 6, _y + 20, `日期:${moment(event.time).format("YYYY-MM-DD hh:mm:ss")}`, "rgb(194, 202, 215)")
                if (this.clickTrigger == false) {
                    this.trigger("clickEvent", event)
                    this.clickTrigger = true
                }

            }

        })
    }



    /**
     * 绘制文字
     * @param {*} x  必须 文字位置x
     * @param {*} y  必须 文字位置y
     * @param {*} txt  必须 文字内容
     * @param {*} rgba 必须 文字颜色
     * @param {*} textAlign 对齐方式
     * @param {*} baseline 基线
     */
    drawTxt(x, y, txt, rgba, textAlign, baseline) {
        this.ctx.save()
        this.ctx.fillStyle = rgba;
        if (textAlign) {
            this.ctx.textAlign = textAlign
        } else {
            this.ctx.textAlign = "start"
        }
        if (baseline) {
            this.ctx.textBaseline = baseline
        } else {
            this.ctx.textBaseline = 'hanging'
        }
        this.ctx.fillText(txt, x, y);
        this.ctx.restore()
    }
    /**
     * 绘制线
     * @param {*} beginX 
     * @param {*} beginY 
     * @param {*} endX 
     * @param {*} endY 
     * @param {*} color 
     * @param {*} width 
     */
    drawLine(beginX, beginY, endX, endY, color, width) {
        this.ctx.save()
        this.ctx.beginPath();
        this.ctx.moveTo(beginX, beginY);
        this.ctx.lineTo(endX, endY);
        this.ctx.strokeStyle = color;
        this.ctx.lineWidth = width;
        this.ctx.stroke();
        this.ctx.restore()
    }
    /**
     * 画点
     * @param {*} x x坐标
     * @param {*} y y坐标
     * @param {*} radius 半径
     * @param {*} rgba 颜色
     */
    drawPoint(x, y, radius, rgba) {
        this.ctx.save()
        this.ctx.beginPath();
        this.ctx.lineWidth = 1;
        this.ctx.fillStyle = rgba;
        this.ctx.arc(x, y, radius, 0, 2 * Math.PI);
        this.ctx.fill();
        this.ctx.closePath();
        this.ctx.restore()
    }


    /**
     * 清除canvas 每次重新绘制需要先清除
     */
    clearCanvas() {
        this.ctx.clearRect(0, 0, this.canvasW, this.canvasH);
    }
    /**
     * 重绘canvas
     */
    refresh() {
        this.clearCanvas();
        this.render()
    }
    /**
     * 事件注册器
     * @param {*} eventName 事件名称
     * @param {*} callback 回调
     */
    on(eventName, callback) {
        let functions = this.listener[eventName] || [];
        functions.push(callback);
        this.listener[eventName] = functions;
    }
    /**
     * 事件触发器
     * @param {*} eventName 事件名称
     */
    trigger(eventName) {
        //args为获得除了eventName后面的参数(注册事件的参数)
        let args = Array.prototype.slice.apply(arguments).slice(1);
        let functions = this.listener[eventName];

        if (!Array.isArray(functions)) return;//自定义事件名不存在

        functions.forEach(function(callback) {
            try {
                callback.apply(this, args);
            } catch (e) {
                console.error(e);
            }
        })
    }
}
