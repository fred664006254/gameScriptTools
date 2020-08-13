/**
 *帮会任务buff
 * author yanyuling
 * date 2018/07/20
 * @class AllianceTaskBatchSendPopupView

 */
class AllianceTaskBatchSendPopupView extends PopupView
{
	private _hold_check:BaseBitmap;
	private _checkPosY1 = 120;
	private _checkPosY2 = 160;
	public constructor() 
	{
		super();
	}

	public initView():void
	{
		let taskid = this.param.data.taskId;
		let taskcfg = Config.AlliancetaskCfg.getAllianceTaskById(taskid);
		let bg:BaseBitmap = BaseBitmap.create("public_tc_bg01");
		bg.width = 540;
		bg.height = 190;
		bg.x = this.viewBg.width/2 - bg.width/2;
		bg.y =  10;
		this.addChildToContainer(bg);

		let bg2:BaseBitmap = BaseBitmap.create("public_tc_bg03");
		bg2.width = bg.width -20;
		bg2.height = bg.height - 20;
		bg2.x =  bg.x + 10;
		bg2.y = bg.y + 10;
		this.addChildToContainer(bg2);

		let box1 = BaseBitmap.create("hold_dinner_box");
		box1.x =  bg.x + 130;
		box1.y = bg.y + 40;
		this.addChildToContainer(box1);

		let txt1 = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_BROWN);
		let typeStr = LanguageManager.getlocal("servantInfo_speciality"+taskcfg.type);
        txt1.text = LanguageManager.getlocal("alliancetaskbatch_sendtxt1",[typeStr]);
        txt1.x = box1.x+ box1.width + 30;
        txt1.y =box1.y+box1.height/2 - txt1.height/2;
        this.addChildToContainer( txt1);

		let box2 = BaseBitmap.create("hold_dinner_box");
		box2.x =  box1.x ;
		box2.y = box1.y + box1.height + 20;
		this.addChildToContainer(box2);
		box1.addTouchTap(this.selCheckBox,this,[1]);
		box2.addTouchTap(this.selCheckBox,this,[2]);

		let txt2 = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_BROWN);
        txt2.text = LanguageManager.getlocal("alliancetaskbatch_sendtxt2");
        txt2.x = txt1.x ;
        txt2.y =box2.y+box2.height/2 - txt2.height/2;
        this.addChildToContainer( txt2);

		this._checkPosY1 = box1.y;
		this._checkPosY2 = box2.y;

		this._hold_check =  BaseBitmap.create("hold_dinner_check");
		this._hold_check.x =  box1.x ;
		this._hold_check.y = box1.y ;
		this.addChildToContainer(this._hold_check);

		let sendBatchBtn =  ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW,"allianceTaskSendBatchBtnTxt",this.sendBatchBtnHandler,this);
		sendBatchBtn.x = this.viewBg.x + this.viewBg.width/2 - sendBatchBtn.width/2;
		sendBatchBtn.y =  bg.y + bg.height + 10;
		this.addChildToContainer(sendBatchBtn);

	}
// 参数 batchtype 门客类型（0为全体，1：武力 2：智力 3：政治 4：魅力）
//     --参数 tid 任务Id
/**
 * 
 *   --返回 data.alliance 帮会信息
    --返回 data.alliancetask 帮会任务信息
    --返回 data.rewards 奖励
    --返回 data.atkv 出战门客属性
    --返回 data.attackinfo{servantId:{atkV:x,rewards:x}} 出战信息{门客Id:{造成伤害，获得政绩}}
    --返回 model myalliance
 */
	private sendBatchBtnCallBack(data: egret.Event): void
	{
		App.MessageHelper.removeNetMessage(NetRequestConst.REQUST_ALLIANCETASK_BATCHFIGHT,this.sendBatchBtnCallBack,this);
		let rData = data.data.data;
		
       	if( rData.ret != 0)
        {
			if(rData.data&&rData.data.nomatchservant){
				App.CommonUtil.showTip(LanguageManager.getlocal("allianceTask_batchNoSer_nomatch"));
			}else{
				App.CommonUtil.showTip(LanguageManager.getlocal("allianceErrorMsg1"));
			}
			
			this.hide();
			return;
		}
		let rewardStr = GameData.formatRewardItem(rData.data.rewards);
		let atkv = rData.data.atkv;//此次造成的伤害

		let flyStr1 = LanguageManager.getlocal("allianceTask_fightV",[""+atkv]) ;
		let list:any[] = [{tipMessage:flyStr1}];
		list = list.concat(rewardStr);
		App.CommonUtil.playRewardFlyAction(list);
		
		ViewController.getInstance().openView(ViewConst.POPUP.ALLIANCETASKBATCHRESULTPOPUPVIEW,{attackinfo:rData.data.attackinfo,taskId:this.param.data.taskId,rewards:rData.data.rewards,atkv:atkv });
		this.hide();
	}

	private sendBatchBtnHandler()
	{
		let taskid = this.param.data.taskId;
		let ttype = 0;
		if(this._hold_check.y == this._checkPosY1){
			ttype = Config.AlliancetaskCfg.getAllianceTaskById(taskid).type; 
		}
		App.MessageHelper.addNetMessage(NetRequestConst.REQUST_ALLIANCETASK_BATCHFIGHT,this.sendBatchBtnCallBack,this);
		NetManager.request(NetRequestConst.REQUST_ALLIANCETASK_BATCHFIGHT,{batchtype:ttype,tid:taskid})
		// ViewController.getInstance().openView(ViewConst.POPUP.ALLIANCETASKBATCHRESULTPOPUPVIEW);
	}
	
	protected selCheckBox(obj:any,param:any){
		this._hold_check.y = this["_checkPosY"+param];
		// if(param == 1){
		// 	this._hold_check.y = this["_checkPosY"+param];
		// }else{
		// 	this._hold_check.y = 150;
		// }
	}

	protected getShowHeight():number
	{
		return 360;
	}

	protected getResourceList():string[]
	{
		return super.getResourceList().concat([
			"hold_dinner_box","hold_dinner_box",
		]);
	}
	
	public dispose():void
	{

		this._hold_check = null;
		super.dispose();
	}
}