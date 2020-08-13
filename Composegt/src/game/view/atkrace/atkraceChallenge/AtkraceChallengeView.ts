

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
	/**生成新标头 */
	protected isHaveTitle():boolean
	{
		return true;
	}
    protected getResourceList():string[]
	{
         return super.getResourceList().concat([
             "popupview_bg3"
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
        //  let _bg:BaseBitmap = BaseBitmap.create("public_tc_bg01");
		// _bg.width = 528;
		// _bg.height = 550;
		// _bg.x = 55
		// _bg.y = this.titleTF.y+80;
		// this.addChild(_bg);

        // 出使条件
		let missionTxt = ComponentManager.getTextField("atkracechallengedes",TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_WARN_YELLOW_NEW);
		missionTxt.text =LanguageManager.getlocal("atkracechallengedes");
		missionTxt.x = 55+20;
		missionTxt.y = 32;
		this.addChildToContainer(missionTxt);

         // 挑战书
        this.challengebookNum= Api.itemVoApi.getItemNumInfoVoById(1552);
        let challengeBookTxt = ComponentManager.getTextField("atkracechallengebook",TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_WARN_YELLOW_NEW);
        challengeBookTxt.text =LanguageManager.getlocal("atkracechallengebook",[this.challengebookNum+""]);
        challengeBookTxt.x =missionTxt.x+370;
        challengeBookTxt.y = missionTxt.y;
        this.addChildToContainer(challengeBookTxt);
  

        if(AtkraceChallengeItem.data.type==3)
        {
            // 追杀令
            this.challengebookNum= Api.itemVoApi.getItemNumInfoVoById(1553);
            challengeBookTxt.text =LanguageManager.getlocal("atkracekill",[this.challengebookNum+""]);
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
			 if (! this.isBattleing(key))
            {
                idList1.push(key);
            }else
            {
                idList2.push(key);
            }
        }
		let keys = idList1.concat(idList2);
	 
		let rect = egret.Rectangle.create();
		rect.setTo(0, 0, 520, 560);
		this._scrollList = ComponentManager.getScrollList(AtkraceChallengeItem, keys, rect);
		this.addChildToContainer(this._scrollList);
		this._scrollList.setPosition(this.viewBg.width/2 - this._scrollList.width/2, 80);
         
    }

     protected initView():void
     {
        // let newTitleBg = BaseBitmap.create("popupview_bg3");
		// newTitleBg.x = this.viewBg.width/2 - newTitleBg.width/2;
		// newTitleBg.y = this.viewBg.y-5;
		// newTitleBg.name = "newTitleBg";
        // this.addChildToContainer(newTitleBg);
        // newTitleBg.height = 600;
        let bg = this.container.getChildByName("newTitleBg");


        bg.height = 658;
     }

	public isBattleing(servantId:string)
   	 {
		let myInfo:AtkraceInfoVo = Api.atkraceVoApi.getMyInfo();
        for (var key in myInfo.asids) {
            if(myInfo.asids[key] == servantId)
                return true;
        }
        return false;
    }
      protected getShowHeight():number
      {
          return 750;
      }

     public dispose():void
     {
		super.dispose();
        this.challengebookNum =0;
        this.servantList =[];
        this._data =null;
     }

}