/**
 * 皇城六部vo
 * author ycg
 * date 2020.5.7
 * @class SixSection1Vo
 */
class SixSection1Vo extends BaseVo
{
	public build:any; //席位信息
	public director:any; //头衔据点信息
	public dinfo:any; //防守信息
	public einfo:any; //仇人信息
	public info:any;
	public version:number; //每期活动开始时间
	public influence:any;//影响力


	public constructor() 
	{
		super();
	}

	public initData(data:any):void
	{
		if(data)
		{
			if(data.build){
				this.build = data.build;
			}
			if(data.dinfo){
				this.dinfo = data.dinfo;
			}
			if(data.director){
				this.director = data.director;
			}
			if(data.einfo){
				this.einfo = data.einfo;
			}
			if(data.info){
				this.info = data.info;
			}
			if (data.influence){
				this.influence = data.influence;
			}
			if (data.version){
				this.version = data.version;
			}
			App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_SIXSECTION1_MODEL_REFRESH,{});
        }
		this.formatBuildCfg();
		this.formatTitleCfg();
    }

    public getCrossServerNum():number{
		if (this.info && this.info.zidNum){
			return this.info.zidNum;
		}
        return 1;
    }

    public formatBuildCfg():any[]{
        let data = this.cfg.getBuildList();
        let stNum = 1;
        for (let i=1; i < data.length; i++){
            data[i].seatNumber += (this.getCrossServerNum() - 1) * data[i].addSeat;
            data[i].rowMaxNum = Math.ceil(data[i].seatNumber/data[i].perMaxSeat);
            data[i].stRowNum = stNum;
            stNum = stNum + data[i].rowMaxNum;
        }
        return data;
	}

	public formatTitleCfg():any[]{
        let data = this.cfg.getDirectorList();
        let stNum = 1;
        for (let i=1; i < data.length; i++){
            data[i].seatNumber += (this.getCrossServerNum() - 1) * data[i].addSeat;
            data[i].rowMaxNum = Math.ceil(data[i].seatNumber/data[i].perMaxSeat);
            data[i].stRowNum = stNum;
            stNum = stNum + data[i].rowMaxNum;
        }
        return data;
	}

    public get cfg(){
        return Config.Sixsection1Cfg;
    }
	
	public dispose():void
	{
		// this.sinfo = [];
		// this.winfo = [];
		// this.showTime = 0;
	}
}