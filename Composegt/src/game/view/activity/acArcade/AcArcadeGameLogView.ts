/**
 * 拉霸机 -记录
 * author 张朝阳
 * date 2019/6/13
 * @class AcArcadeGameLogView
 */
class AcArcadeGameLogView extends PopupView {
	public constructor() {
		super();
	}
	protected getCnCode(): string {
		let code = this.param.data.code;
        if (code == "2" || code == "3") {
            code = "1";
        }
        return code;
    }
	private _logs = [];
	public initView(): void {

		let bg = BaseBitmap.create("public_tc_bg01");
		bg.width = 540;
		bg.height = 700;
		bg.setPosition(this.viewBg.x + this.viewBg.width / 2 - bg.width / 2, 60);
		this.addChildToContainer(bg);

		let rect = new egret.Rectangle(0, 0, 520, 680);
		let logs = this._logs;
		if (logs.length > 1) {
			logs.sort((a, b) => {
				return b[0] - a[0];
			});
		}
		let scrollList = ComponentManager.getScrollList(AcArcadeGameLogsScrollItem, logs, rect, { aid: this.param.data.aid, code: this.param.data.code });
		scrollList.setPosition(bg.x + 10, bg.y + 10);
		this.addChildToContainer(scrollList);
		scrollList.setEmptyTip(LanguageManager.getlocal("acPunishNoData"));

		let totalNum = 0;
		if(logs.length > 0){
			totalNum = logs[0][0];
		}
		let targetStr:string = LanguageManager.getlocal("acArcadeGame_logtiptxt" , [""+totalNum]);
		let targetText:BaseTextField = ComponentManager.getTextField(targetStr,20,TextFieldConst.COLOR_BROWN);
		targetText.setPosition(bg.x+10 , bg.y -25);
		this.addChildToContainer(targetText);
	}

	protected getRequestData():{requestType:string,requestData:any}
	{	
		return {requestType:NetRequestConst.REQUST_ACTIVITY_ARCADEGETLOGS,requestData:{activeId: this.param.data.activeId}};
	}

	protected receiveData(data:{ret:boolean,data:any}):void
	{
		this._logs = data.data.data.logs;
	}
	protected getResourceList(): string[] {
		return super.getResourceList().concat([
			"accarnivalview_tab_red", "acarcadeview_logdown-1", "acarcadeview_logup-1","activity_db_01","activity_charge_red"
		]);
	}
	protected getTitleStr(): string {
		return "acArcadeGameLogViewTitle-" + this.getCnCode();
	}
	public dispose(): void {
		super.dispose();
		this._logs = []; 
	}
}


