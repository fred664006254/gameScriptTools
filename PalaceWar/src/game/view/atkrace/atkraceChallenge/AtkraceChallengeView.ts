

class AtkraceChallengeView extends PopupView
{	

    //挑战界面  //复仇  
    public servantList=[];
	public _scrollList: ScrollList=null;
	private challengebookNum:number =0;
    private _data:any =[];
    public constructor() 
	{   
		super();
	}

    protected getResourceList():string[]
	{
         return super.getResourceList().concat([
		]);
    }
     protected getTitleStr():string
     {
          //type 1挑战按钮  //2复仇   //3追杀
          if(AtkraceChallengeItem.data)
          {
               if(AtkraceChallengeItem.data.type==1)
                {
                    return "atkraceChallenge";
                }
                else if(AtkraceChallengeItem.data.type==2)
                {
                    return "atkraceRevenge";
                }
                else if(AtkraceChallengeItem.data.type==3)
                {
                    return "atkraceVisitTab3";
                }
          }
  
         
     }
   
    protected resetBgSize():void
    {
         super.resetBgSize();
        //  var a  =  this.titleTF.y;
         let _bg:BaseBitmap = BaseBitmap.create("public_9_bg4");
		_bg.width = 528;
		_bg.height = 550;
		_bg.x = 55;
		_bg.y = this.titleTF.y+65;
		this.addChild(_bg);

        // 出使条件
		let missionTxt = ComponentManager.getTextField("atkracechallengedes",TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_BROWN);
		missionTxt.text =LanguageManager.getlocal("atkracechallengedes");
        this.setLayoutPosition(LayoutConst.lefttop, missionTxt, _bg, [1,-24]);
		// missionTxt.x = _bg.x+20;
		// missionTxt.y = _bg.y-24;
		this.addChild(missionTxt);

         // 挑战书
        this.challengebookNum= Api.itemVoApi.getItemNumInfoVoById(1552);
        let challengeBookTxt = ComponentManager.getTextField("atkracechallengebook",TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_BROWN);
        challengeBookTxt.text =LanguageManager.getlocal("atkracechallengebook",[this.challengebookNum+""]);
        this.setLayoutPosition(LayoutConst.righttop, challengeBookTxt, _bg, [3,-24]);
        // challengeBookTxt.x =missionTxt.x+400;
        // challengeBookTxt.y = missionTxt.y;
        
        if(PlatformManager.checkIsTextHorizontal()){
            challengeBookTxt.x = 570 - challengeBookTxt.width -10;
        }
        this.addChild(challengeBookTxt);
  

        if(AtkraceChallengeItem.data.type==3)
        {
            // 追杀令
            this.challengebookNum= Api.itemVoApi.getItemNumInfoVoById(1553);
            challengeBookTxt.text =LanguageManager.getlocal("atkracekill",[this.challengebookNum+""]);
            if(PlatformManager.checkIsThSp())
            {
                 challengeBookTxt.x = this.viewBg.x + this.viewBg.width - challengeBookTxt.width - 30;
            }   
        }
        else
        {
             //挑战书
            this.challengebookNum= Api.itemVoApi.getItemNumInfoVoById(1552);
            challengeBookTxt.text =LanguageManager.getlocal("atkracechallengebook",[this.challengebookNum+""]);
        }


		let idList= Api.servantVoApi.getServantCountLevel60PlusList();
        let idList1=[];
        let idList2=[];
        for (var index = 0; index < idList.length; index++) {
            let key = idList[index];
			 if (!this.isBattleing(key))
            {
                idList1.push(key);
            }else
            {
                idList2.push(key);
            }
        }
        let keys = idList1.concat(idList2);
		//let keys = idList2.concat(idList1);
	 
		let rect = egret.Rectangle.create();
		rect.setTo(0, 0, 528, _bg.height-15);
		this._scrollList = ComponentManager.getScrollList(AtkraceChallengeItem, keys, rect);
		this.addChild(this._scrollList);
		this._scrollList.setPosition(55, _bg.y+5);
         
    }

     protected initView():void
     {
        
     }

	// public isBattleing(servantId:string)
   	//  {
	// 	let myInfo:AtkraceInfoVo = Api.atkraceVoApi.getMyInfo();
    //     for (var key in myInfo.asids) {
    //         if(myInfo.asids[key] == servantId)
    //             return true;
    //     }
    //     return false;
    // }
    public isBattleing(servantId:string)
   	{
		//let myInfo:AtkraceInfoVo = Api.atkraceVoApi.getMyInfo();
        let myInfo:AtkraceInfoVo = null;
        if(AtkraceChallengeItem.data.battleground){
            let vo = <AcBattleGroundVo>Api.acVoApi.getActivityVoByAidAndCode(AcConst.AID_BATTLEGROUND, AtkraceChallengeItem.data.code);
            myInfo = vo.getMyInfo();
        }
        else{
            myInfo = Api.atkraceVoApi.getMyInfo();
        }
        for (var key in myInfo.asids) {
            if(myInfo.asids[key] == servantId)
                return true;
        }
        return false;
    }
    
      protected getShowHeight():number
      {
          return 660;
      }

     public dispose():void
     {
		super.dispose();
        this.challengebookNum =0;
        this.servantList =[];
        this._data =null;
     }

}