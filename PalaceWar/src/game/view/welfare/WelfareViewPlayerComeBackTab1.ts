//召回好友
class WelfareViewPlayerComeBackTab1 extends CommonViewTab{
	private _list : ScrollList = null;
	private _inputTextField : BaseTextField = null;
	
	public constructor(param?) {
		super();
		this.param = param;
		this.initView();
	}

	private get api(){
		return Api.newrebackVoApi;
	}

	private get cfg(){
		return Config.PlayercomebackCfg;
	}

	protected initView():void{
		let view = this;
		App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_REBACK_GETINVITEREWARD, view.rewardCallback, view);
		App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_NEWREBACK,this.update,this);

		let juzhou = BaseBitmap.create(`newinvitelistbg1`);
		view.addChild(juzhou);
		juzhou.height = 190;
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop,juzhou,view,[5,0],true);

		let kuang = BaseBitmap.create(`newinvitelistbgkuang`);
		view.addChild(kuang);
		kuang.width = juzhou.width + 10;
		kuang.height = juzhou.height + 10;
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter,kuang,juzhou);

		let tipBg = BaseBitmap.create(`dailyrechargelistnamebg`);
		view.addChild(tipBg);
		tipBg.width = 470;
		App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop,tipBg,juzhou, [15,7]);

		let tipTxt = ComponentManager.getTextField(LanguageManager.getlocal(`playercomebackTitle`), 22, TextFieldConst.COLOR_LIGHT_YELLOW);
		view.addChild(tipTxt);
		App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter,tipTxt,tipBg,[15,0]);
		
		let myCode = view.api.getBindCode();
		let inputTxt = ComponentManager.getInputTextField(TextFieldConst.COLOR_WHITE, TextFieldConst.FONTSIZE_TITLE_SMALL,300,40,"public_9_bg5",'',TextFieldConst.COLOR_LIGHT_YELLOW);
		view.addChild(inputTxt);
		inputTxt.touchEnabled = false;
		inputTxt.touchChildren = false;
		// view._inputTextField = <BaseTextField>inputTxt.getChildByName("textField");
		// view._inputTextField.textAlign = egret.HorizontalAlign.CENTER;
		App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop,inputTxt,tipBg, [15,tipBg.height+25]);

		view._inputTextField = ComponentManager.getTextField(myCode, 24, TextFieldConst.COLOR_LIGHT_YELLOW);
		view.addChild(view._inputTextField);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter,view._inputTextField,inputTxt);

		// let tipTxt2 = ComponentManager.getTextField(LanguageManager.getlocal(`playercomebackcodetip10`), 20, TextFieldConst.COLOR_BLACK);
		// view.addChild(tipTxt2);
		// App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom,tipTxt2,juzhou,[0,10]);
		
		//复制
		let rewardBtn = ComponentManager.getButton(ButtonConst.BTN2_SMALL_YELLOW, `bureaucratGuide_copy`, ()=>{
			if(App.DeviceUtil.IsHtml5()){
				let str = myCode;
				let input = document.createElement("input");
				input.value = str;
				document.body.appendChild(input);
				input.select();
				input.setSelectionRange(0, input.value.length),
				document.execCommand('Copy');
				document.body.removeChild(input);
				App.CommonUtil.showTip(LanguageManager.getlocal("playercomebackcodeSuccessdes"));
			}
		}, view);
		App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, rewardBtn, inputTxt, [inputTxt.width+5,0]);
		view.addChild(rewardBtn);

		//召回玩家列表
		let state = BaseBitmap.create("qingyuanitemtitlebg");
		view.addChild(state);
		state.addTouchTap(()=>{
			ViewController.getInstance().openView(ViewConst.POPUP.PLAYERCOMEBACKUSERINFOPOPUPVIEW);
		}, view);

		let txt = ComponentManager.getTextField(LanguageManager.getlocal(`playercomebackcodetip7`), 22, TextFieldConst.COLOR_LIGHT_YELLOW);
		view.addChild(txt);
		state.width = txt.width + 65;
		txt.touchEnabled = false;
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, state, juzhou, [0,20]);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter,txt,state);


		let list = ComponentManager.getScrollList(PlayerComeBackTaskItem, [], new egret.Rectangle(0,0,480,GameConfig.stageHeigth - 268 - 50 - juzhou.height - 10));
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, list, juzhou, [0,juzhou.height+5]);
		view.addChild(list);
		view._list = list;

		view.update();
	}

	private updateArr(arr : Config.ComebackTaskCfg[]):any[]{
		let view = this;
		let vo = view.api; 
		if(!vo){
			return;
		}
		let arr1=[];
		let arr2=[];
		let arr3=[];
		
		let rechareTotal = vo.getInviteFriendNum();
		for(let i:number= 0;i < arr.length; i++)
		{
			if(vo.isGetInviteFriendTask(arr[i].id)){//
				arr1.push(arr[i]);
			}
			else{
				if(rechareTotal >= arr[i].needGem)
				{
					arr2.push(arr[i]);
				}
				else
				{
					arr3.push(arr[i]);
				} 
			}
		}
		arr1.sort((a,b)=>{
			return b.id - a.id;
		});
		return arr2.concat(arr3).concat(arr1); 
	}

	private rewardCallback(evt : egret.Event):void{		
		let view = this;
		if(evt.data.ret){
			let rData = evt.data.data.data;
			let rewards = rData.rewards;
			let rewardList =  GameData.formatRewardItem(rewards);
			let pos = view.api.lastpos;
			App.CommonUtil.playRewardFlyAction(rewardList,pos);
			view.update();
        }
	}

	private update():void{
		let view = this;
		let taskarr = view.updateArr(view.cfg.comeReward);
		//排名列表
		let obj = [];
		obj.push({
			data : taskarr[0],
			type : `invite`
		});
		view._list.refreshData(obj);
	}

	private modelFresh():void{		
		let view = this;
	}

	public dispose():void{
		let view = this;
		view._inputTextField = null;
		view._list = null;
		App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_NEWREBACK,this.update,this);
		App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_REBACK_GETINVITEREWARD, view.rewardCallback, view);
		super.dispose();
	}

}