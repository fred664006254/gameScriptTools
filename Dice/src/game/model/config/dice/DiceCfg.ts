namespace Config
{
    interface IDiceCfgItem
    {
        quality:number;//品质 1：普通 2：稀有 3：史诗 4：传说
        iniGrade:number;//初始等级
        maxGrade:number;//最大等级
        weight:number;//随机权重  控制宝箱调用时候的随机权重
        needLevel:number;//level等级大于等于 X，才能随机到此骰子
        costNum:number[];//升级消耗相同骰子数量 第一个值是1升2的值  超过最大值取最大值  都是有(maxGrade - 1)个值
        costGold:number[];//升级消耗金币数量  都是有(maxGrade - 1)个值
        addCritDamage:number[];//每次升级，暴击伤害增加值  都是有(maxGrade - 1)个值  在显示时，要将小数转换为百分数
        type:number;//攻击类型  1:number;//魔法  2：物理  3：异常状态  4：加成  5：安装  6：变换形状  7：合成
        iniCrit:number;//初始暴击率
        iniAtk:number;//初始攻击
        gradeAtk:number;//每次升级增加攻击力
        powerUpAtk:number;//power up每级攻击力提升值
        iniAtkSpeed:number;//初始攻击速度
        gradeAtkSpeed:number;//每次升级提升攻击速度
        powerAtkSpeed:number;//power up每级攻击速度提升值
        target:number;//攻击目标类型  1:number;//前边  2：强敌  3：随机（纯随机）  4：随机（优先顺序）
        property1:number;//特性1的初始值
        gradeProperty1:number;//每次升级增加特性1的值
        powerUpProperty1:number;//power up每级特性1提升值
        property2:number;//特性2的初始值
        gradeProperty2:number;//每次升级增加特性2的值
        powerUpProperty2:number;//power up每级特性2提升值
        property3:number[];//特性3的值  每个骰子不一样
        randomCompose:number;//机器人合成优先级
        randomPowerUp:number;//机器人power UP优先级

    }
    interface IaddmstEffCfg
    {
        timeparam?:number;
        playnum? : number;
        width? : number;
        height? : number;
        type1scale? : number;
        type2scale? : number;
        type3scale? : number;
        bossscale? : number;
        keep?:boolean,
        add?:boolean,
        type?:string,
        rotation?:number,
        scale?:number,
        tmpy?:number,
        tmpx?:number,
        type1tmpy? : number;
        type2tmpy? : number;
        type3tmpy? : number;
        type4tmpy? : number;
    }
    export namespace DiceCfg
    {
        export let maxStar:number=7;
        /**addmst特效组配置*/
        let addmstEffCfg:{[key:string]:IaddmstEffCfg}={
            "102":{timeparam:70, playnum : 1, width : 46, height : 46,type1scale : 2, type2scale : 1, type3scale : 2, bossscale : 2,add:true},
            "105":{type1scale : 0.7, type2scale : 0.5, type3scale : 1, bossscale : 1, add:true, type1tmpy : 20, type2tmpy : 10, type3tmpy : 30, type4tmpy : 30},
            "109":{timeparam:70, playnum : -1, width : 105, height : 105,type1scale : 0.7, type2scale : 0.5, type3scale : 1, bossscale : 1, tmpx : 10},
            // "109":{type:`around`, playnum : -1, rotation : 360, timeparam : 1500, height : 39, width : 37, type1scale : 1},
            "301":{type : `fly`},
            "302":{timeparam:70, playnum : 1, width : 77, height : 77, type1scale : 1, type2scale : 2, tmpx : 10},
            "309":{timeparam:70, playnum : 1, width : 46, height : 46,type1scale : 2, type2scale : 1, type3scale : 2, bossscale : 2,add:true},
            // "310":{timeparam:70, playnum : 1, width : 37, height : 60, type1scale : 0.8, type2scale : 0.8, type3scale : 0.8, bossscale : 0.8},
            "402_1":{timeparam:70, playnum : 1, width : 150, height : 150, type1scale : 1, type2scale : 1, type3scale : 1, bossscale : 1},
            "402_2":{timeparam:70, playnum : 1, width : 300, height : 300, type1scale : 1, type2scale : 1, type3scale : 1, bossscale : 1},
            "405":{timeparam:70, playnum : 1, width : 61, height : 53, type1scale : 1, type2scale : 2, tmpx : 10},
            "408":{type1scale : 0.7, type2scale : 0.5, type3scale : 1, bossscale : 1, add:true, type1tmpy : 20, type2tmpy : 10, type3tmpy : 30, type4tmpy : 30},
            "411":{timeparam:70, playnum : 1, width : 150, height : 150, type1scale : 1, type2scale : 1, type3scale : 1, bossscale : 1, tmpx : 10},
        };

        /** 可叠加特效配置*/
        let canAddEffCfg :{[key:string]:number}={
            "105":1,
            "408":1,
        };

        /**adddice特效组配置*/
        let adddiceEffCfg:{[key:string]:IaddmstEffCfg}={
            "202":{type : `randomFly`, tmpy : -41},
            "205":{type : `randomFly`, tmpy : -41},
            "304":{timeparam:70, playnum : -1, width : 120, height : 120},
            "406":{type : `randomFly`, tmpy : -41},
            "415":{timeparam:70, playnum : -1, width : 120, height : 120, scale : 1},
        };

        /**没有普通攻击的骰子ID列表 */
        let notNmAtk:{[key:string]:number}={
            '201':1,
            "202":1,
            "203":1,
            "205":1,
            "308":1,
            "402":1,
            "406":1,
            "413":1,
            "418":1,
        };
        /**有额外伤害或者buff的骰子 */
        let hasExtAtk:{[key:string]:number}={
            "101":1,
            "102":1,
            "109":1,
            "405":1,
            "104":1,
            "105":1,
            "203":1,
            "204":1,
            "303":1,
            "309":1,
            "411":1,
        };
         /**音效不是攻击而是特殊技能的骰子*/
         let specialSoundAtk:{[key:string]:number}={
            "109":1,
            "207":1,
            "301":1,
            "302":1,
            "304":1,
            "308":1,
            "401":1,
            "402":1,
            "403":1,
            "405":1,
            "407":1,
            "408":1,
            "409":1,
            "410":1,
            "411":1,
            "412":1,
            "415":1,
        };

        let diceList:{[key:string]:DiceCfgItem}={};
        export function formatData(data:any):void
		{
			// for(var key in data)
			// {
			// 	DiceCfg[key]=data[key];
            // }
            let dice=data.dice;
            for (const id in dice)
            {
                if (dice.hasOwnProperty(id))
                {
                    let item:DiceCfgItem=new DiceCfgItem();
                    item.id=id;
                    item.initData(dice[id]);
                    diceList[id]=item;
                }
            }
        }

        /**
         * 检测是否有普通攻击
         * @param id 需要检测的骰子ID
         */
        export function checkHasNmAtk(id:string):boolean
        {
            return !notNmAtk[id];
        }

        export function hasSpecialSoundAtk(id:string):boolean
        {
            let flag = false;
            if(specialSoundAtk[id]){
                flag = true;
            }
            return flag;
        }

        

        export function checkHasExtAtk(id:string):boolean
        {
            return !!hasExtAtk[id];
        }
        
        export function getCfgById(id:string|number):DiceCfgItem
        {
            return diceList[id];
        }
        
        export function getIconById(id:string, isbig?:boolean):string
        {
            return getCfgById(id).getIcon(isbig);
        }

        export function getIdceEffect(id:string, stars?:number):string
        {
            return getCfgById(id).getIdleEffectKey(stars);
        }

        export function getAtkEffect(id:string, stars?:number):string
        {
            return getCfgById(id).getAtkEffectKey(stars);
        }

        export function getStarByLv(id:string,starLv:number):string
        {
            return getCfgById(id).getStarByLv(starLv);
        }
        

        export function getTotalDice():number
        {
            return Object.keys(diceList).length;
        }

        export function getDiceList():string[]
        {
            return Object.keys(diceList);
        }

        export function getAddMstEffById(id:string):IaddmstEffCfg{
            return addmstEffCfg[id];
        }

        export function getAddDiceEffById(id:string):IaddmstEffCfg{
            return adddiceEffCfg[id];
        }

        export function getCanAddEffById(id:string):number{
            return canAddEffCfg[id];
        }
    }

    class DiceCfgItem extends BaseItemCfg implements IDiceCfgItem
    {
        quality:number = 0;//品质 1：普通 2：稀有 3：史诗 4：传说
        iniGrade:number= 0;//初始等级
        maxGrade:number= 0;//最大等级
        weight:number= 0;//随机权重  控制宝箱调用时候的随机权重
        needLevel:number= 0;//level等级大于等于 X，才能随机到此骰子
        costNum:number[];//升级消耗相同骰子数量 第一个值是1升2的值  超过最大值取最大值  都是有(maxGrade - 1)个值
        costGold:number[];//升级消耗金币数量  都是有(maxGrade - 1)个值
        addCritDamage:number[];//每次升级，暴击伤害增加值  都是有(maxGrade - 1)个值  在显示时，要将小数转换为百分数
        type:number= 0;//攻击类型  1:number;//魔法  2：物理  3：异常状态  4：加成  5：安装  6：变换形状  7：合成
        iniCrit:number= 0;//初始暴击率
        iniAtk:number= 0;//初始攻击
        gradeAtk:number= 0;//每次升级增加攻击力
        powerUpAtk:number= 0;//power up每级攻击力提升值
        iniAtkSpeed:number= 0;//初始攻击速度
        gradeAtkSpeed:number= 0;//每次升级提升攻击速度
        powerAtkSpeed:number= 0;//power up每级攻击速度提升值
        target:number= 0;//攻击目标类型  1:number;//前边  2：强敌  3：随机（纯随机）  4：随机（优先顺序）
        property1:number= 0;//特性1的初始值
        gradeProperty1:number= 0;//每次升级增加特性1的值
        powerUpProperty1:number= 0;//power up每级特性1提升值
        property2:number= 0;//特性2的初始值
        gradeProperty2:number= 0;//每次升级增加特性2的值
        powerUpProperty2:number= 0;//power up每级特性2提升值
        property3:number[];//特性3的值  每个骰子不一样
        randomCompose:number=0;//机器人合成优先级
        randomPowerUp:number=0;//机器人power UP优先级
        id:string;

        /**升级消耗相同骰子数量 */
        public getNextLvCostNumByLv(clv:number):number
        {
            let idx = Math.min(clv, (this.costNum.length + 1));
            let num = 0;
            if(this.costNum[idx - 2]){
                num = this.costNum[idx - 2];
            }
            return num;
        }

        /**升级消耗金币数量 */
        public getNextLvCostGoldByLv(clv:number):number
        {
            let idx = Math.min(clv, (this.costGold.length + 1));
            let num = 0;
            if(this.costGold[idx - 2]){
                num = this.costGold[idx - 2];
            }
            return num;
        }
        
        /**每次升级，暴击伤害增加值 */
        public getNextLvAddCritDamage(clv:number):number
        {
            let idx = Math.min(clv, (this.addCritDamage.length + 1));
            let num = 0;
            if(this.addCritDamage[idx - 2]){
                num = this.addCritDamage[idx - 2];
            }
            return num;
        }
        /**icon */
        public getIcon(isbig:boolean):string
        {
            let iconstr = `${isbig?`bigdice`:`dice`}`+this.id;
            if(!ResMgr.hasRes(iconstr)){
                iconstr = `dice101`;
            }
            return iconstr ;
        }

        public getIdleEffectKey(stars?:number):string
        {
            let key="diceidle"+this.id;
            if(!ResMgr.hasRes(key+"1"))
            {
                key=null;
            }
            if(this.id == `414` && stars && stars > 1){
                if(stars == 7){
                    key += `3`;
                }
                else{
                    key += `2`;
                }
            }
            return key;
        }
        public getAtkEffectKey(stars?:number):string
        {
            let key="diceatk"+this.id;
            if(this.id == `414` && stars && stars > 1){
                if(stars == 7){
                    key += `3`;
                }
                else{
                    key += `2`;
                }
            }
            if(!ResMgr.hasRes(key+"1"))
            {
                key=null;
            }
            return key;
        }

        /**
         * 根据星级获取星icon
         */
        public getStarByLv(starLv:number):string
        {
            let starstr = (starLv<7?"dicestar":"dicesun")+this.id;
            if(!RES.hasRes(starstr)){
                starstr = `dicestar101`;
            }
            return starstr ;
        }

        /**name */
        public get name():string
        {
            return  LangMger.getlocal(`dice${this.id}_name`);
        }
        /**品质文本 */
        public get qualityStr():string
        {
            return  `<font color=${GameConfig.getQualityColor(this.quality)}>${LangMger.getlocal(`quality${this.quality}`)}</font>`;
        }
        /**说明 */
        public get desc():string
        {
            return  LangMger.getlocal(`dicedesc_${this.id}`);
        }

        public getBtShawdow():string
        {
            return "diceshadow"+(this.quality>3?4:3);
        }
        /*各类型标题*/
        public getAtkIconByType(type : string):string
        {
            let res = ``;
            if(type == `specialDesc1` || type == `specialDesc2`){
                res = `dice${this.id}special${type.split(`specialDesc`)[1]}`
            }
            else{
                res = `dice${type}`
            }
            if(!RES.hasRes(res)){
                res = `diceattricon`;
            }
            return  res;
        }
        /**各类型具体数值 */
        public getAtkDetailByType(type : string, pwlv : number = 1, lv : number = 0):string
        {
            let str = `-`;
            let info = this.getAtkDetailPowerUpnumByType(type);
            if(!lv){
                lv = Api.DiceVoApi.getDiceLvById(this.id);
            }
            switch(type){
                //攻击类型
                case `atkType`:
                    if(this.type && LangMger.checkHasKey(`diceAtktype${this.type}`)){
                        str = LangMger.getlocal(`diceAtktype${this.type}`); 
                    }
                    break;
                //攻击力
                case `atkNum`:
                    let num = this.getAtkByLv(lv) + (pwlv - 1) * info.num;
                    if(num != 0){
                        str = parseFloat(num.toFixed(2)) + "";
                    }
                    break;
                //攻击速度
                case `atkSpeed`:
                    let speed = this.getAtkSpeedByLv(lv) + (pwlv - 1) * info.num;;
                    if(speed != 0){
                        str=parseFloat(speed.toFixed(2))+"s";
                    }
                    break;
                //攻击目标
                case `atkTarget`:
                    if(this.target && LangMger.checkHasKey(`diceAtktarget${this.target}`)){
                        str = LangMger.getlocal(`diceAtktarget${this.target}`); 
                    }
                    break;
                //特殊值1
                case `specialDesc1`:
                    if(this.property1 != 0){
                        let num = this.property1+(this.gradeProperty1 * (lv - this.iniGrade)) + (pwlv - 1) * info.num;
                        if(this.gradeProperty1 == 0){
                            if(this.judgeIsTime(type)){
                                str =  `${num}s`;
                            }
                            else if(this.judgeIsPercent(type)){
                                num = parseFloat((num * 100).toFixed(2));
                                str =  `${num}%`;
                            }
                            else{
                                if(num < 1 && num > 0){
                                    num = parseFloat((num * 100).toFixed(2));
                                }
                                str =  `${num}${this.property1 < 0 ? (`s`) : (this.property1 < 1 ? `%` : ``)}`;
                            }
                        }
                        else{
                            if(this.judgeIsTime(type)){
                                str =  `${num}s`;
                            }
                            else if(this.judgeIsPercent(type)){
                                num = parseFloat((num * 100).toFixed(2));
                                str =  `${num}%`;
                            }
                            else{
                                if(this.gradeProperty1 < 1 && this.gradeProperty1 > 0){
                                    num = parseFloat((num * 100).toFixed(2));
                                }
                                str =  `${num}${this.gradeProperty1 < 0 ? (`s`) : (this.gradeProperty1 < 1 ? `%` : ``)}`;
                            }
                        }
                    }
                    break;
                //特殊值2
                case `specialDesc2`:
                    if(this.property2 != 0){
                        let num = this.property2+(this.gradeProperty2 * (lv - this.iniGrade)) + (pwlv - 1) * info.num;
                        if(this.gradeProperty2 == 0){
                            if(this.judgeIsTime(type)){
                                str =  `${num}s`;
                            }
                            else if(this.judgeIsPercent(type)){
                                num = parseFloat((num * 100).toFixed(2));
                                str =  `${num}%`;
                            }
                            else{
                                if(num < 1 && num > 0){
                                    num = parseFloat((num * 100).toFixed(2));
                                }
                                str =  `${num}${this.property2 < 0 ? (`s`) : (this.property2 < 1 ? `%` : ``)}`;
                            }
                        }
                        else{
                            if(this.judgeIsTime(type)){
                                str =  `${num}s`;
                            }
                            else if(this.judgeIsPercent(type)){
                                num = parseFloat((num * 100).toFixed(2));
                                str =  `${num}%`;
                            }
                            else{
                                if(this.gradeProperty2 < 1 && this.gradeProperty2 > 0){
                                    num = parseFloat((num * 100).toFixed(2));
                                }
                                str =  `${num}${this.gradeProperty2 < 0 ? (`s`) : (this.gradeProperty2 < 1 ? `%` : ``)}`;
                            }
                           
                        }
                    }
                    break;
            }
            return  str;
        }


        private timeSpecial = {
            109 : {specialDesc2 : true},
            203 : {specialDesc2 : true},
            304 : {specialDesc1 : true, specialDesc2 : true},
            308 : {specialDesc2 : true},
            403 : {specialDesc1 : true},
            407 : {specialDesc1 : true},
            408 : {specialDesc2 : true},
            413 : {specialDesc2 : true},
            415 : {specialDesc1 : true, specialDesc2 : true},
        };

        private percentSpecial = {
            417 : {specialDesc1 : true, specialDesc2 : true},
        };

        public judgeIsTime(specialType : string):boolean{
            let flag = false;
            if(this.timeSpecial[this.id] && this.timeSpecial[this.id][specialType]){
                flag = true;
            }
            return flag;
        }

        public judgeIsPercent(specialType : string):boolean{
            let flag = false;
            if(this.percentSpecial[this.id] && this.percentSpecial[this.id][specialType]){
                flag = true;
            }
            return flag;
        }

        /**各类型具体升级每级别数值 */
        public getAtkDetailPernumByType(type : string):string
        {
            let str = ``;
            switch(type){
                //攻击力
                case `atkNum`:
                    if(this.gradeAtk != 0){
                        str = `${this.gradeAtk > 0 ? `+` : ``}${parseFloat(this.gradeAtk.toFixed(2))}`;
                    }
                    break;
                //攻击速度
                case `atkSpeed`:
                    if(this.gradeAtkSpeed != 0){
                        str = `${this.gradeAtkSpeed > 0 ? `+` : ``}${parseFloat(this.gradeAtkSpeed.toFixed(2))}s`;
                    }
                    break;
                //特殊值1
                case `specialDesc1`:
                    if(this.property1 && this.gradeProperty1 != 0){
                        let num = this.gradeProperty1;
                        if(this.judgeIsTime(type)){
                            str =  `${this.gradeProperty1 > 0 ? `+` : ``}${num}s`;
                        }
                        else if(this.judgeIsPercent(type)){
                            num = parseFloat((num * 100).toFixed(2));
                            str =  `${this.gradeProperty1 > 0 ? `+` : ``}${num}%`;
                        }
                        else{
                            if(this.gradeProperty1 < 1 && this.gradeProperty1 > 0){
                                num = parseFloat((num * 100).toFixed(2));
                            }
                            str =  `${this.gradeProperty1 > 0 ? `+` : ``}${num}${this.gradeProperty1 < 0 ? (`s`) : (this.gradeProperty1 < 1 ? `%` : ``)}`;
                        }
                        
                    }
                    break;
                //特殊值2
                case `specialDesc2`:
                    if(this.property2 && this.gradeProperty2 != 0){
                        let num = this.gradeProperty2;
                        if(this.judgeIsTime(type)){
                            str =  `${this.gradeProperty2 > 0 ? `+` : ``}${num}s`;
                        }
                        else if(this.judgeIsPercent(type)){
                            num = parseFloat((num * 100).toFixed(2));
                            str =  `${this.gradeProperty1 > 0 ? `+` : ``}${num}%`;
                        }
                        else{
                            if(this.gradeProperty1 < 1 && this.gradeProperty2 > 0){
                                num = parseFloat((num * 100).toFixed(2));
                            }
                            str =  `${this.gradeProperty2 > 0 ? `+` : ``}${num}${this.gradeProperty2 < 0 ? (`s`) : (this.gradeProperty2 < 1 ? `%` : ``)}`;
                        }
                    }
                    break;
            }
            return  str;
        }

        /**各类型具体powerup每级别数值 */
        public getAtkDetailPowerUpnumByType(type : string):{str : string, num : number}
        {
            let str = ``;
            let num = 0;
            switch(type){
                //攻击力
                case `atkNum`:
                    if(this.powerUpAtk != 0){
                        num = this.powerUpAtk;
                        str = `${this.powerUpAtk > 0 ? `+` : ``}${parseFloat(num.toFixed(2))}`;
                    }
                    break;
                //攻击速度
                case `atkSpeed`:
                    if(this.powerAtkSpeed != 0){
                        num = this.powerAtkSpeed;
                        str = `${this.powerAtkSpeed > 0 ? `+` : ``}${parseFloat(this.powerAtkSpeed.toFixed(2))}s`;
                    }
                    break;
                //特殊值1
                case `specialDesc1`:
                    if(this.powerUpProperty1 != 0){
                        num = this.powerUpProperty1;
                        if(this.judgeIsTime(type)){
                            str =  `${this.powerUpProperty1 > 0 ? `+` : ``}${num}s`;
                        }
                        else if(this.judgeIsPercent(type)){
                            num = parseFloat((num * 100).toFixed(2));
                            str =  `${this.powerUpProperty1 > 0 ? `+` : ``}${num}%`;
                        }
                        else{
                            if(this.powerUpProperty1 < 1 && this.powerUpProperty1 > 0){
                                num = parseFloat((num * 100).toFixed(2));
                            }
                            str =  `${this.powerUpProperty1 > 0 ? `+` : ``}${num}${this.powerUpProperty1 < 0 ? (`s`) : (this.powerUpProperty1 < 1 ? `%` : ``)}`;
                        }
                        num = this.powerUpProperty1;
                    }
                    break;
                //特殊值2
                case `specialDesc2`:
                    if(this.powerUpProperty2 != 0){
                        num = this.powerUpProperty2;
                        if(this.judgeIsTime(type)){
                            str =  `${this.powerUpProperty2 > 0 ? `+` : ``}${num}s`;
                        }
                        else if(this.judgeIsPercent(type)){
                            num = parseFloat((num * 100).toFixed(2));
                            str =  `${this.powerUpProperty2 > 0 ? `+` : ``}${num}%`;
                        }
                        else{
                            if(this.gradeProperty1 < 1 && this.powerUpProperty2 > 0){
                                num = parseFloat((num * 100).toFixed(2));
                            }
                            str =  `${this.powerUpProperty2> 0 ? `+` : ``}${num}${this.powerUpProperty2 < 0 ? (`s`) : (this.powerUpProperty2 < 1 ? `%` : ``)}`;
                        }
                        num = this.powerUpProperty2;
                    }
                    break;
            }
            return {
                str : str,
                num : num
            };
        }

        /**每一次增幅效果*/
        public getPowerUpString():string
        {
            let str = '';
            let arr = [{type: `atkNum`}, {type: `atkSpeed`},{type: `specialDesc1`}, {type: `specialDesc2`}];
            for(let i = 0; i < arr.length; ++ i){
                let unit = arr[i];
                let type = unit.type;
                let pre = LangMger.getlocal(`dice${type}`);
                if(type == `specialDesc1` || type == `specialDesc2`){
                    pre = this[`get${type}`]();
                }
                let info = this.getAtkDetailPowerUpnumByType(type);
                if(info.str != ``){
                    pre += `${info.str}`;
                    str += `${pre}\n`;
                }
            }
            return str;
        }

        /**特殊功能说明1 */
        public getspecialDesc1():string
        {
            let str = ``;
            if(this.property1 && LangMger.checkHasKey(`dicespecialdesc1_${this.id}`)){
                str = LangMger.getlocal(`dicespecialdesc1_${this.id}`);
            }
            return  str;
        }
        /**特殊功能说明2 */
        public getspecialDesc2():string
        {
            let str = ``;
            if(this.property2 && LangMger.checkHasKey(`dicespecialdesc2_${this.id}`)){
                str = LangMger.getlocal(`dicespecialdesc2_${this.id}`);
            }
            return  str;
        }

        /**
         * 根据当前等级获取暴击率
         * @param clv 等级
         */
        public getTotalCritByLv(clv:number):number
        {
            let l=this.addCritDamage.length;
            let lv=Math.min(clv,l);
            let totalCrit:number=0;
            for (let i = 0; i < lv; i++)
            {
                totalCrit += this.addCritDamage[i];
            }
            return totalCrit;
        }

         /**
         * 根据当前等级获取攻击速度
         * @param clv 等级
         */
        public getAtkSpeedByLv(clv:number):number
        {
            return this.iniAtkSpeed+(this.gradeAtkSpeed * (clv-this.iniGrade))
        }

        /**
         * 根据当前等级获取攻击力
         * @param clv 等级
         */
        public getAtkByLv(clv:number):number
        {
            return this.iniAtk+(this.gradeAtk * (clv - this.iniGrade));
        }

        public getPowerAtkByLv(plv:number):number
        {
            return this.powerUpAtk*(plv-1);
        }

        /**
         * 根据骰子等级获取特性1的值
         * @param clv 骰子等级
         */
        public getProperty1ByLv(clv:number):number
        {
            return this.property1+(this.gradeProperty1 * (clv - this.iniGrade));
        }

        /**
         * 根据骰子能量等级获取属性1加成
         * @param plv 能量等级
         */
        public getPowerProperty1ByLv(plv:number):number
        {
            return this.powerUpProperty1*(plv-1);
        }

        /**
         * 根据骰子等级获取特性2的值
         * @param clv 骰子等级
         */
        public getProperty2ByLv(clv:number):number
        {
            return this.property2+(this.gradeProperty2 * (clv - this.iniGrade));
        }

        /**
         * 根据骰子能量等级获取属性2加成
         * @param plv 能量等级
         */
        public getPowerProperty2ByLv(plv:number):number
        {
            return this.powerUpProperty2*(plv-1);
        }
    }
}