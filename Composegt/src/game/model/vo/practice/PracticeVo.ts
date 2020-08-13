/**
 * 修身
 * author yanyuling
 * date 2018/04/18
 * @class PracticeVo
 */
class PracticeVo extends BaseVo
{

    /*"修身属性",
        [0] "修身属性:武力",
        [1] "修身属性:智力",
        [2] "修身属性:政治",
        [3] "修身属性:魅力",
    */
    public attr:number[] = []; 
    public level:number=0;//  "修身等级",
    public exp:number=0;//  "修身阅历",
    public spd:number=0;//  "修身阅历生产速度",
    public storage:{num:number,st:number,level:number};//  "修身阅历仓库上次存储数量", "修身阅历仓库上次存储时间",
    public info: {buynum:number};

    /**
     * "修身资质信息",
     * "修身资质属性:武力",
     * "修身资质属性:智力",
     * "修身资质属性:政治",
     * "修身资质属性:魅力",
     */
    public ability:number[] = []; 
    public task = {};//  "资质任务详情",

    public initData(data:any):void
	{
		if(data)
		{
            this.attr = data.attr;
            this.level = data.level;
            this.exp = data.exp;
            this.spd = data.spd;
            this.storage = data.storage;
            this.ability = data.ability;
            this.info = data.info;
            if(data.task)
            {
                if (!this.task)
                {
                    this.task = {};
                }
                for (let key in data.task) {
                    let taskvo:PracticeTaskVo = this.task[key];
                    if(!taskvo)
                    {
                        taskvo = new PracticeTaskVo();
                        this.task[key] = taskvo;
                    }
                    taskvo.initData(data.task[key]);
                    taskvo.id = key;
                }
            }
        }
    }

    public dispose():void
	{
        this.attr = [];
        this.ability = [];
        this.info = null;
        this.level = 0;
        this.exp = 0;
        this.spd = 0;
        this.storage = null;
    }
}

class PracticeTaskVo extends BaseVo
{
    public stage:number=0;
    public v:number=0;
    public f:number=0; //"成就领取情况0未完成 1已完成",
    public id:string="";
    public initData(data:any):void
	{
		if(data)
		{
            this.stage = data.stage;
            this.v = data.v;
            this.f = data.f;
        }
    }

    public get curV()
    {
        return 0;
    }
    public dispose():void
	{
        this.stage = 0;
        this.v = 0;
        this.f = 0;
        this.id = "";
    }
}