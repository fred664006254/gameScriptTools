class AcQuestionnaireVo extends AcBaseVo
{
	private _answerInfo : any = {};
	private _flag = 0;
	public constructor(){
		super();
	}

	public initData(data:any):void{
		super.initData(data);
		this._flag = data.flag;
	}

	/**
	 * 是否显示活动icon，设置后自动显示或者隐藏活动
	 */
	public get isShowIcon():boolean
	{
		return this._flag !== 1;
	}
	
	private get cfg() : Config.AcCfg.QuestionnaireCfg{
		return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
	}

	public get isShowRedDot(): boolean 
	{	
		return false; 
	} 
	
	public get acTimeAndHour():string
	{	
		let et = this.et;
		return App.DateUtil.getOpenLocalTime(this.st,et,true);
	}

	public isInActivity():boolean{
		return GameData.serverTime >= this.st && GameData.serverTime < this.et;
	}

	public isActyEnd():boolean{
		let flag = false;
		if(GameData.serverTime >= this.et){
			flag = true;
		}
		return flag;
	}
	
	public getCountDown():number{
		let num = 0;
		if(this.isInActivity()){
			num = this.et - GameData.serverTime;
		}
		else{
			num = 0;
		}
		return num;
	}

	public setQuestionAnswer(id : number, answer : string):void{
		if(this._answerInfo){
			this._answerInfo[id] = answer;
		}
	}

	public getQuestionAnswer(id : number,):string{
		let answer = '';
		if(this._answerInfo && this._answerInfo[id]){
			answer = this._answerInfo[id];
		}
		return answer;
	}

	public dispose():void {
		this._answerInfo = {};
		super.dispose(); 
	}
}