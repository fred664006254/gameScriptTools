/**
 对战信息logitem
 * author qianjun
 */
class AcConquerMainLandLogItem extends ScrollListItem
{
	private _data:any = null;
	private _itemIndex:number;
	private _nameTf:BaseTextField;
	private _code : string = '';
	public constructor() 
	{
		super();
	}

	private get cfg() : Config.AcCfg.ConquerMainLandCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }

    private get vo() : AcConquerMainLandVo{
        return <AcConquerMainLandVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

    private get acTivityId() : string{
        return `${this.aid}-${this.code}`;
    }

    private get aid() : string{
        return AcConst.AID_CONQUERMAINLAND;
    }

    private get code() : string{
        return this._code;
    }

    protected getUiCode():string{
        let code = '';
        switch(Number(this.code)){
            default:
                code = `1`;
                break;
        }
        return code;
    }
	
	protected initItem(index:number,data:any,itemparam:any) {	
		let view = this;
		view._data = data;
        view._code = itemparam;
		this.width = 620;
		if(data.empty){
			this.height = 100;
			return;
		}
		// childInfo.total
		this._data = data;
		this._code = itemparam;
		this._itemIndex = index;
		let code = view.getUiCode();
		
		// let nameTxt = ComponentManager.getTextField(`${index + 1}. ${LanguageManager.getlocal(`atkraceyamenid`,[data.winId])}`, 20, TextFieldConst.COLOR_WARN_YELLOW2);
		// App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, nameTxt, view, [0,5]);
		// view.addChild(nameTxt);

		let str = `${index + 1}.`;
		let winname = `${data.winName}${LanguageManager.getlocal(`atkraceyamenid`, [data.winId])}`
		let cityname = view.vo.getCityName(`${data.citylevel}_${data.cityNum}_${data.cityIdx}`);
		//撤军
		if(data.callback){
			str = LanguageManager.getlocal(`acConquerMainLandLog5_1-${code}`, [winname, cityname]);
		}
		else{
			/**1 
			* 通报标头→玩家ID 成功夺取 地标名 
			* 进攻胜利通报：玩家ID 已成功夺取 地标名
			* 防御胜利通报：玩家ID 成功防御 地标名
			* */
			let str1 = LanguageManager.getlocal(`acConquerMainLandLog1_${data.title.type}-${code}`, [winname, cityname]);
			/**2
			* （通报内容）→玩家ID 出动大军，来势汹汹，击败了 玩家ID2，成功夺取了 地标名！
			* */
			let str2 = ``;
			if(data.report.type == 5){
				str2 = LanguageManager.getlocal(`acConquerMainLandLog2_${data.report.type}_${data.report.rid}-${code}`, [winname, data.loseName, cityname]);
			}
			else{
				str2 = LanguageManager.getlocal(`acConquerMainLandLog2_${data.report.type}-${code}`, [winname, data.loseName, cityname]);
			}
			/**3
			* （接②，连胜通报）→并取得x连胜！
			* */
			let str3 = ``;
			if(data.win.type){
				str3 = LanguageManager.getlocal(`acConquerMainLandLog3_${data.win.type}-${code}`, [data.win.type == 1 ? data.win.num : data.loseName, data.win.num]);
			}
			str = str1 + `\n` + str2 + str3;
		}    
		/**4
		* 时间戳
		* */
		// str += `\n${App.DateUtil.getFormatBySecond(data.time, 9)}`;   

		let descTxt = ComponentManager.getTextField(str, 18);
		descTxt.width = 450;
		descTxt.lineSpacing = 5;
		App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, descTxt, view, [0,5]);
		view.addChild(descTxt);
		
		let timeTxt = ComponentManager.getTextField(LanguageManager.getlocal(`acBattileGroundTime-${view.getUiCode()}`, [App.DateUtil.getFormatBySecond(data.time, 2)]), 18);
		App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, timeTxt, descTxt, [0,descTxt.textHeight + 7]);
		view.addChild(timeTxt);	

		this.height = timeTxt.y + timeTxt.textHeight + 15;
		
		let line : BaseBitmap = BaseBitmap.create(`public_line1`);
		line.width = view.width;
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, line, view);
		this.addChild(line);

		let losename = `${data.loseName}${LanguageManager.getlocal(`atkraceyamenid`, [data.loseId])}`
		let hfBtn = ComponentManager.getButton(`dinner_detail`, ``, ()=>{
			//刷新界面
			let attackwin = data.title.type == 1;
			let wardata = {
				info : {
					team :  attackwin ? data.winteam : data.loseteam,
					titleId : attackwin ? data.winTitle : data.loseTitle,
					zid : attackwin ? data.winzid : data.losezid,
					name :  attackwin ? data.winName : data.loseName,
				},
				tinfo : {
					team :  !attackwin ? data.winteam : data.loseteam,
					titleId : !attackwin ? data.winTitle : data.loseTitle,
					zid : !attackwin ? data.winzid : data.losezid,
					name :  !attackwin ? data.winName : data.loseName,
				},
			}
			ViewController.getInstance().openView(ViewConst.COMMON.ACCONQUERMAINLANDWARSHOWVIEW,{
				aid : this.aid,
				code : this.code,
				wardata : wardata,
				result : `win`,
				attackwin : attackwin,
				cityName : view.vo.getCityName(`${data.citylevel}_${data.cityNum}`),
				cityName2 : view.vo.getCityName(`${data.citylevel}_${data.cityNum}_${data.cityIdx}`),
			});
        }, view);
        App.DisplayUtil.setLayoutPosition(LayoutConst.rightverticalCenter, hfBtn, view, [10,0]);
		view.addChild(hfBtn);
		
		hfBtn.visible = !data.callback;
	}
	
	public getSpaceY():number
	{
		return 0;
	}

	public dispose():void
	{

		this._data = null;
		this._itemIndex = null;
		this._nameTf = null;
		super.dispose();
	}
}