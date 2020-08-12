/**
 * 奖励物品vo
 * author dmj
 * date 2017/9/26
 * @class RewardItemVo
 */
class RewardItemVo extends BaseVo 
{
	/**
	 * 后续纯前端用的type直接从1001开始，前后端约定好的才继续使用type+1规范，必须添加注释
	 * 奖励物品类型：1钻石 2金币 1001奖杯 50宝箱 100骰子
	 * 				
	 */ 
	public type:number = 0;
	/**
	 * 物品id
	 */
	public id:number = 0;
	/**
	 * 数量
	 */
	public num:number = 0;

	private _name:string = "";
	private _tipName:string = "";
	private _desc:string="";
	private _icon:string = "";
	private _iconbg:string = "";
	// 品质
	private _quality:number = 1;
	private _code:string = "";

	private _dropId:string ="";

	public target:number = 0;
	public targetId: number = 0;
	public getRewards: string = null;
	//奖励数组中原始排序，用于礼包领取
	public originalIdx: number = 0;

	public constructor() {
		super();
	}

	public initData(data:string):void{
		let itemArr:Array<string> = data.split("_");
		this.type = Number(itemArr[0]);
		this.id = Number(itemArr[1]);
		this.num = Number(itemArr[2]);
		this._code = (itemArr[3]);
		switch(this.type){
			case 1001:
				this._name = LangMger.getlocal(`sysscore`);
				this._icon = `trophy_icon`;
				break;
			case 100:
				this._name = LangMger.getlocal(`dice${this.id}_name`);
				this._icon = Config.DiceCfg.getIconById(this.id.toString());
				break;
			case 1:
				this._name = LangMger.getlocal(`shopitemtypegem`);
				this._icon = `item1`;
				break;
			case 2:
				this._name = LangMger.getlocal(`shopitemtypegold`);
				this._icon = `item2`;
				break;
			case 50:
				let boxcfg = Config.BoxCfg.getBoxCfgById(this.id.toString());
				if(boxcfg){
					this._name = boxcfg.name;
					this._icon = boxcfg.icon;
				}
				break;
		}
	}

	public get name():string{
		return this._name;
	}

	/**根据品质取颜色 */
	// public get nameColor():number
	// {
	// 	let color:number = GameConfig.getQualityColor(this._quality);
	// 	return color;
	// }

	public get icon():string{
		return this._icon;
	}

	public get iconBg():string{
		return this._iconbg;
	}

	public get message():string{
		return this.name+(this.num<0?this.num:"+"+this.num);
	}

	public get tipMessage():string{
		return this._tipName + (this.num<0?String(this.num):"+"+this.num);
	}

	public get desc():string{
		let desc = '';
		if(this.type == 100){
			desc = LangMger.getlocal(`diceDesc_${this.id}`);
		}
		return desc
	}

	public get dropDesc():string{
		let desc = '';
		if(this.type == 100){
			desc = LangMger.getlocal(`diceDropDesc_${this.id}`);
		}
		return desc
	} 
	
	public get itemType():string{
		return "";
	}

	public getDescTxt(showEffectStr?:boolean):BaseTextField{
		let descStr:string;
		if(showEffectStr){
			descStr=App.StringUtil.formatStringColor(LangMger.getlocal("effectTitle"),ColorEnums.black)+this.desc;
		}
		else{
			descStr=this.desc;
		}
		let descTxt:BaseTextField=ComponentMgr.getTextField(descStr,TextFieldConst.SIZE_CONTENT_COMMON,ColorEnums.black);
		descTxt.lineSpacing=2;
		return descTxt;
	}
	
	public dispose():void{
		this.type = 0;
		this.id = 0;
		this.num = 0;
		this._name = "";
		this._tipName = "";
		this._desc="";
		this._icon = "";
		this._iconbg = "";
		this._quality = 1;
		this.target = 0;
		this.targetId = 0;
		this.getRewards = null;
		this.originalIdx = 0;
	}
}