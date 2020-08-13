/**
 * author:qianjun
 * desc:区服排行榜单item
*/
class AcConquerMainLandRoundItem extends ScrollListItem
{
	public constructor() {
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
            case 1:
			case 2:
				code = `1`;
				break;
            default:
                code = this.code;
                break;
        }
        return code;
    }
    
    private _code : string = '';

	protected initItem(index:number, data:any, itemparam:any){	
        // --时间与分数倍率。倍率为0的时间段为休战期
        // --startTime:开始时间
        // --endTime:结束时间
        // --buff:分数倍率：获得分数 = 位置分数 * 分数倍率
        let view = this;
        view._code = itemparam;
        view.width = 580;
        view.height = 30;
        let code = view.getUiCode();

        let status = '';
        let color = null;
        let nowday = view.vo.getNowDay();
        let startTime = view.vo.st + 2 * 3600 + Number(data.day - 1) * 86400 + data.startTime;
        let endTime = view.vo.st + 2 * 3600 + Number(data.day - 1) * 86400 + data.endTime;
        if(nowday == data.day){
            let time = 1;
            if(GameData.serverTime < startTime){
                time = 2;
                color = TextFieldConst.COLOR_BROWN_NEW;
            }
            else if(GameData.serverTime >= endTime){
                time = 1;
                color = TextFieldConst.COLOR_QUALITY_GREEN_NEW;
            }
            else{
                time = 3;
                color = TextFieldConst.COLOR_QUALITY_RED_NEW;
                //交战动画
                let effectClip = ComponentManager.getCustomMovieClip(`mainlandinfight${code}-`,10,70);
                effectClip.width = 125;
                effectClip.height = 154;
                view.addChild(effectClip);
                effectClip.playWithTime(-1);
                App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, effectClip, view, [-20,-68]);
            }
            status = LanguageManager.getlocal(`acConquerMainLandtimetip${time}-${code}`,[App.DateUtil.getFormatBySecond(startTime,13),App.DateUtil.getFormatBySecond(endTime,13)]);
        }
        else{
            color = nowday > data.day ? TextFieldConst.COLOR_QUALITY_GREEN_NEW : TextFieldConst.COLOR_BROWN_NEW;
            status = LanguageManager.getlocal(`acConquerMainLandtimetip${nowday > data.day ? 1 : 2}-${code}`,[App.DateUtil.getFormatBySecond(startTime,13),App.DateUtil.getFormatBySecond(endTime,13)]);
        }

        let pos = data.pos[0];
        let rankTxt = ComponentManager.getTextField("", 18, color);
        rankTxt.text = String(index+1);
        rankTxt.x = pos.x + (pos.width - rankTxt.textWidth) / 2 - 27.5;
        rankTxt.y = 0;
        rankTxt.setColor(color);
        view.addChild(rankTxt);
		
        pos = data.pos[1];
        let str = `${status}`;
        //${App.DateUtil.getFormatBySecond(startTime,15) + "-" + App.DateUtil.getFormatBySecond(endTime,15)}
        let serverTxt = ComponentManager.getTextField(str, 18, color);
        serverTxt.anchorOffsetX = serverTxt.width;
        serverTxt.x = this.x + this.width/2 + 170;//pos.x + (pos.width - serverTxt.textWidth) / 2 - 12.5;//GameConfig.stageWidth/2 - serverTxt.textWidth/2;
        serverTxt.y = 0;
        serverTxt.setColor(color);
        view.addChild(serverTxt);

        pos = data.pos[2];
		let scoreTxt = ComponentManager.getTextField(LanguageManager.getlocal(`acConquerMainLandrationum-${code}`, [data.buff]), 18, color);
		scoreTxt.x = pos.x + (pos.width - scoreTxt.textWidth) / 2 - 15.5;;//GameConfig.stageWidth/2 + 155 - scoreTxt.textWidth/2;
        scoreTxt.y = 0;
        scoreTxt.setColor(color);
        view.addChild(scoreTxt);
    
        let line = BaseBitmap.create("public_line4");
        view.addChild(line);
        line.width = view.width - 10;
        line.x = 8;
        line.y  = view.height - line.height;
        // this.addTouchTap(this.rankClick, this);
    }

	public dispose():void{
        let view = this;
        //App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_ATKRACEGRANK), view.getMsgBack, view);
        super.dispose();
    }
}