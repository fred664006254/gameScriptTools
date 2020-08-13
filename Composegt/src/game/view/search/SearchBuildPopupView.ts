class SearchBuildPopupView extends PopupView
{

	public constructor()
	{
		super();
	} 
	
	private _wifeId:string = undefined;
	protected initView():void
	{

		let bg = BaseBitmap.create("popupview_bg3");
		bg.height = 755;
		bg.x = this.viewBg.width/2 - bg.width/2;
		bg.y = -3;
		this.addChildToContainer(bg);

		let itemVoList:SearchBuildInfoItemVo[]=Api.searchVoApi.getPersonListByBuildId(this.getBuildId());
		let rect:egret.Rectangle=egret.Rectangle.create();
		rect.setTo(0,0,546,750);
		let scrollList:ScrollList=ComponentManager.getScrollList(SearchBuildScrollItem,itemVoList,rect);
		this.addChildToContainer(scrollList);
		scrollList.setPosition((this.viewBg.width-scrollList.width)/2,0);

		if(this._wifeId){
			this._wifeId = this.param.data.wifeId;
			//定位处理
			for (let index = 0; index < itemVoList.length; index++) {
				let element = itemVoList[index];
				if(element.wifeId == this._wifeId){
					scrollList.setScrollTopByIndex(index);
					break;
				}
			}
		}
	}
	// 计算背景高度时使用，在container高度的基础上添加该高度
	protected getBgExtraHeight():number
	{
		return 18;
	}
	private getBuildId():number
	{
		if(this.param.data.bid){
			this._wifeId = this.param.data.wifeId;
			return this.param.data.bid;
		}
		return this.param.data;
	}

	protected getTitleStr():string
	{
		return "searchBuild"+this.getBuildId();
	}
	protected getResourceList():string[]
	{
		return super.getResourceList().concat([
			"progress_type1_yellow2",
			"progress_type3_bg",
			"popupview_bg3",
			"popupview_bg5",
			"searchbuild_bg1",
			"searchbuild_bg2"
		]);
	}


	public dispose():void
	{
		this._wifeId = null;

		super.dispose();
	}
}

class SearchBuildScrollItem extends ScrollListItem
{
	public constructor()
	{
		super();
	}
	private _cfg = undefined;
	private _vo:SearchBuildInfoItemVo = undefined;
	private _progressBar:ProgressBar;
	private _costNum:number = 0;
	private _descBg:BaseBitmap = null;

	private _goldImg:BaseBitmap = null;
	private _costTxt:BaseTextField = null;
	private _searchButton:BaseButton = null;
	public dispose():void
	{
		this._cfg = null;
		this._vo = null;
		this._progressBar = null;
		this._costNum = 0;
		this._descBg = null;

		this._goldImg = null;
		this._costTxt = null;
		this._searchButton = null;
		super.dispose();
	}

	protected initItem(index:number,data:any):void
	{
		let itemVo:SearchBuildInfoItemVo=data;
		let itemCfg=Config.SearchCfg.getPersonItemCfgByPersonId(itemVo.personId);
		this._cfg = itemCfg;
		this._vo = itemVo;

		
		
		this.width = 546;
		this.height = 272 + 25;
		let bg:BaseBitmap=BaseBitmap.create("searchbuild_bg1");
		bg.width=546;
		bg.height=272;
		bg.y = this.height/2 - bg.height/2;
		this.addChild(bg);
	
		// this.height=bg.height+this.getSpaceY();
		this.width=bg.width;

		let upline = BaseBitmap.create("popupview_bg5");
		upline.width = 544;
		upline.x = this.width/2 - upline.width/2;
		upline.y = bg.y - 8;
		this.addChild(upline);


		let downline = BaseBitmap.create("popupview_bg5");
		downline.width = 544;
		downline.x = this.width/2 - downline.width/2;
		downline.y = bg.y + bg.height;
		this.addChild(downline);
		
		let descBg:BaseBitmap=BaseBitmap.create("public_9v_bg10");
		descBg.width=254;
		if(itemVo.isShowProgress)
		{
			descBg.height=272;
		}
		else
		{
			descBg.height=272;
		} 
		descBg.setPosition(bg.x+bg.width-descBg.width,bg.y);
		this.addChild(descBg);
		this._descBg = descBg
		let txtWidth:number=234;//descBg.width-10;



		//背景圆
		// let headBg:BaseBitmap=BaseBitmap.create("public_tcdw_bg03");
		// headBg.anchorOffsetX = headBg.width/2; 
		// headBg.anchorOffsetY = headBg.height/2; 
		// headBg.scaleX=3.8;
		// headBg.scaleY=3.8;
		// headBg.setPosition(bg.x+(descBg.x-bg.x-headBg.width)/2+headBg.width/2,bg.y+(bg.height-headBg.height)/2+headBg.height/2);
		// this.addChild(headBg);

		let personIcon:BaseLoadBitmap=BaseLoadBitmap.create(itemCfg.personFullIcon);
		let size = itemCfg.fullIconSize;
		personIcon.width=size.width;
		personIcon.height=size.height;
		
		if(itemCfg.personFullIcon.indexOf("servant_full_") > -1 ||  itemCfg.personFullIcon.indexOf("skin_full_") > -1  ){
			personIcon.setScale(330/personIcon.width); 
			personIcon.setPosition(125-165,bg.y+bg.height-personIcon.height*personIcon.scaleY);
		}else{
			personIcon.setScale(210/personIcon.width);
			personIcon.setPosition(20,bg.y+bg.height-personIcon.height*personIcon.scaleY);
		}
		
		this.addChild(personIcon);

		let bottomMask = BaseBitmap.create("searchbuild_bg2");
		bottomMask.width = bg.width;
		bottomMask.x = bg.x;
		bottomMask.y = bg.y + bg.height - bottomMask.height;
		this.addChild(bottomMask);

		if(itemVo.type == 1){
			if(itemCfg.personFullIcon.indexOf("servant_full_") > -1 ||  itemCfg.personFullIcon.indexOf("skin_full_") > -1 ){
				personIcon.setScale(330/personIcon.width); 
				personIcon.setPosition(125-165,bg.y+bg.height-personIcon.height*personIcon.scaleY-3);
			}else{
				personIcon.setScale(245/personIcon.width);
				personIcon.setPosition(15,bg.y+bg.height-personIcon.height*personIcon.scaleY-3);
			}
		}

		let nameSize = TextFieldConst.FONTSIZE_TITLE_SMALL;
		if(PlatformManager.checkIsViSp()){
			nameSize = TextFieldConst.FONTSIZE_CONTENT_SMALL;
		}
		// let nameBg = BaseBitmap.create("public_biaoti2");
		// // nameBg.width = 180;
		// nameBg.x =300;
		// nameBg.y = 35;
		// this.addChild(nameBg);

		let nameTxt:BaseTextField=ComponentManager.getTextField(itemCfg.name,nameSize,TextFieldConst.COLOR_WHITE);
		// nameBg.width = (nameTxt.width + 30)>180?nameTxt.width + 30:180;
		// nameBg.x = 390 - nameBg.width/2;
		// nameBg.y = 35;
		nameTxt.x = descBg.x + descBg.width/2 - nameTxt.width/2;
		nameTxt.y = descBg.y + 10;

		// nameTxt.width= 160;
		// nameTxt.setPosition(310,43);
		
		// nameTxt.textAlign ='center';
		this.addChild(nameTxt);
		
		let shortNameTxt:BaseTextField=ComponentManager.getTextField(itemCfg.shortDesc,TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_WARN_YELLOW_NEW);
		
		
		if(PlatformManager.checkIsViSp()){
			// shortNameTxt.width=nameTxt.width;
			shortNameTxt.width=txtWidth;
			shortNameTxt.x = nameTxt.x + nameTxt.width/2 - shortNameTxt.width /2;
			shortNameTxt.y = nameTxt.y+nameTxt.height+15;

		} else {
			shortNameTxt.width= 180;//nameTxt.width;
			shortNameTxt.textAlign ='center';
			shortNameTxt.setPosition(nameTxt.x + nameTxt.width/2 - shortNameTxt.width/2,nameTxt.y+nameTxt.height+15);
		}

		this.addChild(shortNameTxt);

		let descTxt:BaseTextField=ComponentManager.getTextField(itemCfg.desc,TextFieldConst.FONTSIZE_ACTIVITY_COMMON,TextFieldConst.COLOR_WARN_YELLOW_NEW);
		descTxt.width=txtWidth;
		descTxt.setPosition(descBg.x+descBg.width/2 - descTxt.width/2,shortNameTxt.y+shortNameTxt.height+20);
		this.addChild(descTxt); 

		let eventTxt:BaseTextField=ComponentManager.getTextField(itemVo.eventDesc,TextFieldConst.FONTSIZE_ACTIVITY_COMMON,TextFieldConst.COLOR_WARN_GREEN_NEW);
		eventTxt.width= (eventTxt.width > txtWidth)?txtWidth : eventTxt.width;
		eventTxt.name = "eventTxt";
		eventTxt.setPosition(descBg.x+descBg.width/2 - eventTxt.width/2,descBg.y+descBg.height-eventTxt.height-10);
		this.addChild(eventTxt);

		let gemSearchCost = itemCfg.gemSearchCost;
		if(Api.switchVoApi.checkOpenSearchGem() && this._vo.wifeId && !Api.wifeVoApi.getWifeInfoVoById(this._vo.wifeId) && gemSearchCost && gemSearchCost.length > 0){
			let snum = Api.searchVoApi.getWifeValueById(this._vo.personId);
			let costNum = "";
			if(snum <= gemSearchCost.length-1){
				this._costNum = itemCfg.gemSearchCost[snum];
			}else{
				this._costNum = gemSearchCost[gemSearchCost.length-1];
			}
			costNum = ""+this._costNum ;


			let searchButton = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, null, this.searchBtnClickHandler, this);
			// searchButton.scaleX = searchButton.scaleY = 0.6;
			// searchButton.anchorOffsetX = searchButton.width/2;
			// searchButton.anchorOffsetY = searchButton.height/2;
			searchButton.x = descBg.x + descBg.width/2 - searchButton.width * searchButton.scaleX / 2;
			searchButton.y = descBg.y + descBg.height - 38 - searchButton.height * searchButton.scaleY;//goldImg.y - searchButton.height/2*searchButton.scaleX ;
			this.addChild(searchButton);
			searchButton.name = "searchButton";
			this._searchButton = searchButton;

			let btnTxt = ComponentManager.getTextField(LanguageManager.getlocal("searchBtnTxt1"),18,TextFieldConst.COLOR_BTN_YELLOW);
			btnTxt.x = searchButton.width/2 - btnTxt.width/2;
			btnTxt.y = searchButton.height - btnTxt.height - 5;
			searchButton.addChild(btnTxt);


			let goldImg = BaseBitmap.create("public_icon1");
			goldImg.scaleX = goldImg.scaleY = 0.7;
			goldImg.name = "goldImg";
			searchButton.addChild(goldImg);
			this._goldImg = goldImg;

			let costTxt:BaseTextField=ComponentManager.getTextField(costNum,18,TextFieldConst.COLOR_BTN_YELLOW);
			costTxt.name = "costTxt";
			searchButton.addChild(costTxt);
			this._costTxt = costTxt;

			goldImg.x = searchButton.width/2 - (goldImg.width * goldImg.scaleX + costTxt.width) / 2;
			goldImg.y = 0;
			costTxt.x = goldImg.x + goldImg.width * goldImg.scaleX;
			costTxt.y = goldImg.y + goldImg.height * goldImg.scaleY/ 2 - costTxt.height / 2;


		}
		
		// let maskBg:BaseBitmap=BaseBitmap.create("public_searchmask");
		// maskBg.width = 255;
		// // maskBg.height = 200;
		// maskBg.setPosition(10,bg.y+bg.height-maskBg.height-5);
		// this.addChild(maskBg);
		if(itemVo.isShowProgress)
		{
			let progressBar:ProgressBar=ComponentManager.getProgressBar("progress_type1_yellow2","progress_type3_bg",289);//   "progress_type1_yellow","progress_type1_bg"
			progressBar.setPosition(bg.x+(bg.width - descBg.width -progressBar.width)/2,bg.y+bg.height-progressBar.height-2);
			progressBar.setTextColor(TextFieldConst.COLOR_WARN_YELLOW_NEW);
			let curValue = itemVo.value/itemVo.maxValue;
			let curText = Math.floor(curValue * 100) + "%"; 
			progressBar.setPercentage(curValue,curText);
			this.addChild(progressBar);
			this._progressBar = progressBar;
		}
	}


	private checkHaveStory(personId:any,rewards:any):void
	{

		let search = Config.SearchCfg.getPersonItemCfgByPersonId(personId);
		let storyList:string[] = [];
		let valueStory = null;
		//判断是红颜 还是蓝颜，此处还需要修改
		if(search.wifeId){
			let wifeId = search.wifeId;
			let wifeCfg = Config.WifeCfg.getWifeCfgById(wifeId);
			if(wifeCfg.isBule()){
				if(search.blueValueStory){
					valueStory = search.blueValueStory;
				}
			} else {
				if(search.valueStory){
					valueStory = search.valueStory;
				}
			}
		}
		
		if(!valueStory){
			this.showResult({personId:personId,rewards:rewards});
			return;
		}

		storyList = valueStory.split(",");

		let mainList = [];
		let normalList = [];
		for(let i = 0;i < storyList.length; i++){
			let indexItemCfg = Config.IndexstoryCfg.getIndexItemCfgById(storyList[i]);
			if(indexItemCfg.eventType == 1){
				mainList.push(indexItemCfg);
			} else {
				normalList.push(indexItemCfg);
			}
		}
		let storyId = null;
	
		let value:number = Api.searchVoApi.getWifeValueById(personId);

		//判断主线剧情
		for(let j = 0; j < mainList.length; j ++){
			let main = mainList[j];
			//判断触发类型是寻访次数
			if(main.triggerType == 1){
				//判断符合条件
				if(main.lower <= value && main.upper >= value){
					//判断概率
					if(Math.random() < main.rate){
						//选择剧情id
						let storyIDS = main.storyID.split(",");
						let storyIndex = Math.floor(Math.random() * storyIDS.length);
						storyId = storyIDS[storyIndex];
						break;
					}
				}
			}
		}
		//判断其他剧情
		if(storyId == null){
			for(let j = 0; j < normalList.length; j ++){
				let normal = normalList[j];
				//判断触发类型是寻访次数
				if(normal.triggerType == 1){
					//判断符合条件
					if(normal.lower <= value && normal.upper >= value){
						//判断概率
						if(Math.random() < normal.rate){
							//选择剧情id
							let storyIDS = normal.storyID.split(",");
							let storyIndex = Math.floor(Math.random() * storyIDS.length);
							storyId = storyIDS[storyIndex];
							break;
						}
					}
				}
			}
		}
		if(storyId == null){

			this.showResult({personId:personId,rewards:rewards});

		} else {

			//调用剧情界面
			ViewController.getInstance().openView(ViewConst.COMMON.SEARCHSTORYVIEW,{callback: this.showResult, target:this, storyId:storyId, params:{personId:personId,rewards:rewards}});
		}
	}

	private showResult(params:{personId:any,rewards:any}):void
	{
		ViewController.getInstance().openView(ViewConst.POPUP.SEARCHRESULTPOPUPVIEW,{personId:params.personId,rewards:params.rewards});
		if(Api.wifeVoApi.getWifeInfoVoById(this._vo.wifeId)){
			let eventTxt:BaseTextField = <BaseTextField>this.getChildByName("eventTxt");
			eventTxt.text = this._vo.eventDesc ;
			eventTxt.width= (eventTxt.width > 234)?234 : eventTxt.width;
			eventTxt.x = this._descBg.x + this._descBg.width/2 - eventTxt.width/2
			// this.getChildByName("goldImg").visible = false;
			// this.getChildByName("costTxt").visible = false;
			// this.getChildByName("searchButton").visible = false;
			this._goldImg.visible = false;
			this._costTxt.visible = false;
			this._searchButton.visible = false;

			App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_SEARCHGEM_REFRESH);
		}else{
			let gemSearchCost = this._cfg.gemSearchCost;
			let costTxt:BaseTextField = <BaseTextField>this.getChildByName("costTxt");
			if(costTxt && gemSearchCost && gemSearchCost.length > 0){
				let snum = Api.searchVoApi.getWifeValueById(this._vo.personId);
				let costNum = 0;
				if(snum <= gemSearchCost.length-1) {
					costNum = gemSearchCost[snum];
				}else{
					costNum = gemSearchCost[gemSearchCost.length-1];
				}
				costTxt.text = ""+costNum;
			}
		}
		if(this._vo.isShowProgress)
		{
			let curValue = this._vo.value/this._vo.maxValue;
			let curText = Math.floor(curValue * 100) + "%"; 
			this._progressBar.setPercentage(curValue,curText);
		}else{
			if(this._progressBar){
				this._progressBar.visible = false;
			}
		}
	}

	protected searchCallBack(event:egret.Event)
	{
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_SEARCH_PLAYGEM),this.searchCallBack,this);
		let ret = event.data.data.ret;
		if(ret == 0){
			//打开寻访弹窗
			let rewards =  event.data.data.data.rewards || "";
			let pid = this._vo.personId;
			if(Api.switchVoApi.checkOpenNewStory()){
				this.checkHaveStory(pid,rewards)
			} else {
				this.showResult({personId:pid, rewards:rewards});
			}
			
		}
	}

	protected searchBtnClickHandler()
	{
		if( (PlatformManager.checkIsWxCfg()) &&  Api.playerVoApi.getPlayerVipLevel() < 4){
            App.CommonUtil.showTip(LanguageManager.getlocal("bookroom_strenthen_vip4Tip"));
            return;
        }
		if(Api.playerVoApi.getPlayerGem() < this._costNum ){
			App.CommonUtil.showTip(LanguageManager.getlocal("searchBtn_gemTip"));
			return;
		}
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_SEARCH_PLAYGEM),this.searchCallBack,this);
		let pid = this._vo.personId;
		NetManager.request(NetRequestConst.REQUEST_SEARCH_PLAYGEM,{personid:pid});
	}

	public getSpaceX():number
	{
		return 0;
	}

	public getSpaceY():number
	{
		return 10;
	}
}