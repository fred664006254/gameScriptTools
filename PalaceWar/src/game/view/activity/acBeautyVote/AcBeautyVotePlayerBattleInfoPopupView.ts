/**
  * 花魁活动-- 花魁对战详情
  * @author 张朝阳
  * date 2019/4/23
  * @class AcBeautyVotePlayerInfoPopupView
  */
class AcBeautyVotePlayerBattleInfoPopupView extends PopupView {
	public constructor() {
		super();
	}


	protected initView(): void {
		let code = this.param.data.code;
		let aid = this.param.data.aid;
		let joinInfoList: { left: number, right: number, win: number, round: number, leftscore: number, rightscore: number }[] = this.param.data.joinInfoList;

		let cfg = <Config.AcCfg.BeautyVoteCfg>Config.AcCfg.getCfgByActivityIdAndCode(aid, code);
		let vo = <AcBeautyVoteVo>Api.acVoApi.getActivityVoByAidAndCode(aid, code);


		let bg = BaseLoadBitmap.create("acbeautyvoteview_battleinfobg-" + code);
		bg.width = 512;
		bg.height = 650;
		bg.setPosition(this.viewBg.x + this.viewBg.width / 2 - bg.width / 2, 15);
		this.addChildToContainer(bg);

		for (let i = 0; i < joinInfoList.length; i++) {
			let joinInfo = joinInfoList[i];
			if (i < 4) {
				let index = i;
				this.createItem(bg, joinInfo, index, 5, 25, 153, 33, 153, 58, 34, 66);

			}
			else if (i < 6) {
				let index = i - 4;
				this.createItem(bg, joinInfo, index, 183, 57, 308, 153, 308, 146, 78, 152);


			}
			else if (i < 7) {
				let index = i - 6;
				let leftBM: BaseLoadBitmap = null;
				let rightBM: BaseLoadBitmap = null;
				if (joinInfo.left) {
					leftBM = BaseLoadBitmap.create("acbeautyvoteview_playerbattle" + String(joinInfo.left) + "-" + code);
					leftBM.width = 140;
					leftBM.height = 56;
					leftBM.setPosition(bg.x + 81 + leftBM.width * 2, bg.y + 133 + 300 * index);
					this.addChildToContainer(leftBM);
				}
				else {
					leftBM = BaseLoadBitmap.create("acbeautyvoteview_playerbattle-" + code);
					leftBM.width = 140;
					leftBM.height = 56;
					leftBM.setPosition(bg.x + 81 + leftBM.width * 2, bg.y + 133 + 300 * index);
					this.addChildToContainer(leftBM);
				}

				if (joinInfo.right) {
					rightBM = BaseLoadBitmap.create("acbeautyvoteview_playerbattle" + String(joinInfo.right) + "-" + code);
					rightBM.width = 140;
					rightBM.height = 56;
					rightBM.setPosition(bg.x + 81 + rightBM.width * 2, bg.y + rightBM.height + 381 + 300 * index);
					this.addChildToContainer(rightBM);
				}
				else {
					rightBM = BaseLoadBitmap.create("acbeautyvoteview_playerbattle-" + code);
					rightBM.width = 140;
					rightBM.height = 56;
					rightBM.setPosition(bg.x + 81 + rightBM.width * 2, bg.y + rightBM.height + 381 + 300 * index);
					this.addChildToContainer(rightBM);
				}

				let midPipeV = BaseBitmap.create("acbeautyvoteview_vertical");
				midPipeV.height = 248;
				midPipeV.setPosition(leftBM.x + leftBM.width / 2 - midPipeV.width / 2, leftBM.y + leftBM.height);
				this.addChildToContainer(midPipeV);
				if (joinInfo.win) {
					let colorMidPipeV = BaseBitmap.create("acbeautyvoteview_yellow");
					colorMidPipeV.height = 96;
					this.addChildToContainer(colorMidPipeV);
					if (joinInfo.win == joinInfo.left) {
						colorMidPipeV.setPosition(leftBM.x + leftBM.width / 2 - colorMidPipeV.width / 2, leftBM.y + leftBM.height);
					}
					else {
						colorMidPipeV.setPosition(rightBM.x + rightBM.width / 2 - colorMidPipeV.width / 2, rightBM.y - colorMidPipeV.height);
					}

				}
				else {
					let linres = "acbeautyvoteview_blue";
					if (joinInfo.left && joinInfo.right) {
						linres = "acbeautyvoteview_red";
					}
					let colorMidPipeV = BaseBitmap.create(linres);
					colorMidPipeV.height = 248;
					colorMidPipeV.setPosition(leftBM.x + leftBM.width / 2 - colorMidPipeV.width / 2, leftBM.y + leftBM.height);
					this.addChildToContainer(colorMidPipeV);

				}
				if (joinInfo.left) {

					let leftNameTF = ComponentManager.getTextField(LanguageManager.getlocal("acBeautyVoteViewTab1PlayerName" + joinInfo.left + "-" + this.param.data.code), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
					leftNameTF.setPosition(leftBM.x + 58, leftBM.y + 13);
					this.addChildToContainer(leftNameTF);

					let leftItemContainer = new BaseDisplayObjectContainer();
					this.addChildToContainer(leftItemContainer);


					let leftItemBg = BaseBitmap.create("public_9_resbg");
					leftItemBg.setPosition(0, 0);
					leftItemContainer.addChild(leftItemBg);



					let leftitemBM = BaseBitmap.create("acbeautyvoteview_acitemsmall-" + this.param.data.code);
					leftitemBM.anchorOffsetX = leftitemBM.width / 2;
					leftitemBM.anchorOffsetY = leftitemBM.height / 2;
					leftitemBM.setScale(0.8);
					leftitemBM.setPosition(leftItemBg.x + 20, leftItemBg.y + leftItemBg.height / 2);
					leftItemContainer.addChild(leftitemBM);

					let leftItemNumTF = ComponentManager.getTextField(String(joinInfo.leftscore), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
					leftItemNumTF.setPosition(leftitemBM.x + leftitemBM.width / 2 + 5, leftitemBM.y - leftItemNumTF.height / 2);
					leftItemContainer.addChild(leftItemNumTF);
					leftItemContainer.setScale(0.6);
					leftItemContainer.setPosition(leftBM.x + 52, leftBM.y + 30);

				}
				if (joinInfo.right) {
					let rightNameTF = ComponentManager.getTextField(LanguageManager.getlocal("acBeautyVoteViewTab1PlayerName" + joinInfo.right + "-" + this.param.data.code), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
					rightNameTF.setPosition(rightBM.x + 58, rightBM.y + 13);
					this.addChildToContainer(rightNameTF);

					let rightItemContainer = new BaseDisplayObjectContainer();
					this.addChildToContainer(rightItemContainer);



					let rightItemBg = BaseBitmap.create("public_9_resbg");
					rightItemBg.setPosition(0, 0);
					rightItemContainer.addChild(rightItemBg);



					let rightitemBM = BaseBitmap.create("acbeautyvoteview_acitemsmall-" + this.param.data.code);
					rightitemBM.anchorOffsetX = rightitemBM.width / 2;
					rightitemBM.anchorOffsetY = rightitemBM.height / 2;
					rightitemBM.setScale(0.8);
					rightitemBM.setPosition(rightItemBg.x + 20, rightItemBg.y + rightItemBg.height / 2);
					rightItemContainer.addChild(rightitemBM);

					let rightItemNumTF = ComponentManager.getTextField(String(joinInfo.rightscore), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
					rightItemNumTF.setPosition(rightitemBM.x + rightitemBM.width / 2 + 5, rightitemBM.y - rightItemNumTF.height / 2);
					rightItemContainer.addChild(rightItemNumTF);

					rightItemContainer.setScale(0.6);
					rightItemContainer.setPosition(rightBM.x + 52, rightBM.y + 30);
				}
				if (joinInfo.win) {
					let maskBM = BaseBitmap.create("acbeautyvoteview_black");
					maskBM.width = leftBM.width;
					maskBM.height = leftBM.height;
					maskBM.alpha = 0.6;
					this.addChildToContainer(maskBM);

					let failTF = ComponentManager.getTextField(LanguageManager.getlocal("acBeautyVotePlayerBattleInfoPopupViewFail-" + this.param.data.code), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WHITE);
					this.addChildToContainer(failTF);
					if (joinInfo.win == joinInfo.left) {
						maskBM.setPosition(rightBM.x + rightBM.width / 2 - maskBM.width / 2, rightBM.y + rightBM.height / 2 - maskBM.height / 2);
						failTF.setPosition(rightBM.x + rightBM.width / 2 - failTF.width / 2, rightBM.y + rightBM.height / 2 - failTF.height / 2);

					}
					else {
						maskBM.setPosition(leftBM.x + leftBM.width / 2 - maskBM.width / 2, leftBM.y + leftBM.height / 2 - maskBM.height / 2);
						failTF.setPosition(leftBM.x + leftBM.width / 2 - failTF.width / 2, leftBM.y + leftBM.height / 2 - failTF.height / 2);
					}


				}
			}
			else if (i < 8) {
				if (joinInfo.left) {
					let leftBM = BaseLoadBitmap.create("acbeautyvoteview_playerbattle" + String(joinInfo.left) + "-" + code);
					leftBM.width = 140;
					leftBM.height = 56;
					leftBM.setPosition(bg.x + 81 + leftBM.width * 2, bg.y + 133 + 124 + leftBM.height / 2);
					this.addChildToContainer(leftBM);

					let winBM = BaseBitmap.create("acbeautyvoteview_win-" + code);
					winBM.setPosition(leftBM.x + 55, leftBM.y + leftBM.height / 2 - winBM.height / 2);
					this.addChildToContainer(winBM);
				}
				else {
					let pkBM = BaseBitmap.create("acbeautyvoteview_diadem-" + code);
					pkBM.setPosition(bg.x + 81 + 350 - pkBM.width / 2, bg.y + 133 + 124 + 56 - pkBM.height / 2);
					this.addChildToContainer(pkBM)
				}
			}

		}


	}

	private createItem(bg: BaseLoadBitmap, joinInfo: { left: number, right: number, win: number, round: number, leftscore: number, rightscore: number }, index: number, offsetX: number, leftOffestY: number, leftRideOffestY: number, rightOffestY: number, rightRideOffestY: number, midPipeVheight: number, colorMidPipeVheight_win: number, colorMidPipeVheight_noWin: number) {
		let leftBM: BaseLoadBitmap = null;
		let rightBM: BaseLoadBitmap = null;
		let leftPipeH: BaseBitmap = null;
		let rightPipeH: BaseBitmap = null;
		let midPipeV: BaseBitmap = null;
		let midPipeH: BaseBitmap = null;
		let colorLeftPipeH: BaseBitmap = null;
		let colorRightPipeH: BaseBitmap = null;
		let colorMidPipeH: BaseBitmap = null;
		let colorMidPipeV: BaseBitmap = null;

		if (joinInfo.left) {
			leftBM = BaseLoadBitmap.create("acbeautyvoteview_playerbattle" + String(joinInfo.left) + "-" + this.param.data.code);
			leftBM.width = 140;
			leftBM.height = 56;
			leftBM.setPosition(bg.x + offsetX, bg.y + leftOffestY + leftRideOffestY * index);
			this.addChildToContainer(leftBM);

		}
		else {
			leftBM = BaseLoadBitmap.create("acbeautyvoteview_playerbattle-" + this.param.data.code);
			leftBM.width = 140;
			leftBM.height = 56;
			leftBM.setPosition(bg.x + offsetX, bg.y + leftOffestY + leftRideOffestY * index);
			this.addChildToContainer(leftBM);
		}

		if (joinInfo.right) {
			rightBM = BaseLoadBitmap.create("acbeautyvoteview_playerbattle" + String(joinInfo.right) + "-" + this.param.data.code);
			rightBM.width = 140;
			rightBM.height = 56;
			rightBM.setPosition(bg.x + offsetX, bg.y + rightBM.height + rightOffestY + rightRideOffestY * index);
			this.addChildToContainer(rightBM);

		}
		else {
			rightBM = BaseLoadBitmap.create("acbeautyvoteview_playerbattle-" + this.param.data.code);
			rightBM.width = 140;
			rightBM.height = 56;
			rightBM.setPosition(bg.x + offsetX, bg.y + rightBM.height + rightOffestY + rightRideOffestY * index);
			this.addChildToContainer(rightBM);
		}
		leftPipeH = BaseBitmap.create("acbeautyvoteview_horizontal");
		leftPipeH.anchorOffsetX = leftPipeH.width / 2;
		leftPipeH.anchorOffsetY = leftPipeH.height / 2;
		leftPipeH.skewX = 180;
		leftPipeH.setPosition(leftBM.x + leftBM.width + leftPipeH.width / 2, leftBM.y + leftBM.height / 2);
		this.addChildToContainer(leftPipeH);

		rightPipeH = BaseBitmap.create("acbeautyvoteview_horizontal");
		rightPipeH.setPosition(rightBM.x + rightBM.width, rightBM.y + rightBM.height / 2 - rightPipeH.height / 2);
		this.addChildToContainer(rightPipeH);

		midPipeV = BaseBitmap.create("acbeautyvoteview_vertical");
		midPipeV.height = midPipeVheight;
		midPipeV.setPosition(rightPipeH.x + rightPipeH.width - midPipeV.width, rightPipeH.y - midPipeV.height);
		this.addChildToContainer(midPipeV);

		midPipeH = BaseBitmap.create("acbeautyvoteview_vertical");
		midPipeH.height = 17;
		midPipeH.anchorOffsetX = midPipeH.width / 2;
		midPipeH.anchorOffsetY = midPipeH.height / 2;
		midPipeH.rotation = 90;
		midPipeH.setPosition(midPipeV.x + midPipeV.width + midPipeH.height / 2 - 1, midPipeV.y + midPipeV.height / 2);
		this.addChildToContainer(midPipeH);

		if (joinInfo.win) {
			let lineRes: string = "acbeautyvoteview_yellow";
			colorMidPipeV = BaseBitmap.create(lineRes);
			colorMidPipeV.height = colorMidPipeVheight_win;
			if (joinInfo.win == joinInfo.left) {
				colorLeftPipeH = BaseBitmap.create(lineRes);
				colorLeftPipeH.width = 20;
				colorLeftPipeH.setPosition(leftBM.x + leftBM.width, leftBM.y + leftBM.height / 2 - colorLeftPipeH.height / 2);
				this.addChildToContainer(colorLeftPipeH);

				colorMidPipeV.setPosition(midPipeV.x + midPipeV.width / 2 - colorMidPipeV.width / 2, colorLeftPipeH.y);

			}
			else {
				colorRightPipeH = BaseBitmap.create(lineRes);
				colorRightPipeH.width = 20;
				colorRightPipeH.setPosition(rightBM.x + rightBM.width, rightBM.y + rightBM.height / 2 - colorRightPipeH.height / 2);
				this.addChildToContainer(colorRightPipeH);

				colorMidPipeV.setPosition(midPipeV.x + midPipeV.width / 2 - colorMidPipeV.width / 2, colorRightPipeH.y + colorRightPipeH.height - colorMidPipeV.height);
			}
			this.addChildToContainer(colorMidPipeV);
			colorMidPipeH = BaseBitmap.create(lineRes);
			colorMidPipeH.width = 20;
			colorMidPipeH.setPosition(midPipeH.x + midPipeH.height / 2 - colorMidPipeH.width, midPipeH.y - colorMidPipeH.height / 2);
			this.addChildToContainer(colorMidPipeH);
		}
		else {
			let lineRes: string = null;
			if (joinInfo.round == this.param.data.nowround) {
				lineRes = "acbeautyvoteview_red";
			}
			else {
				lineRes = "acbeautyvoteview_blue";
			}
			colorLeftPipeH = BaseBitmap.create(lineRes);
			colorLeftPipeH.width = 20;
			colorLeftPipeH.setPosition(leftBM.x + leftBM.width, leftBM.y + leftBM.height / 2 - colorLeftPipeH.height / 2);
			this.addChildToContainer(colorLeftPipeH);

			colorRightPipeH = BaseBitmap.create(lineRes);
			colorRightPipeH.width = 20;
			colorRightPipeH.setPosition(rightBM.x + rightBM.width, rightBM.y + rightBM.height / 2 - colorRightPipeH.height / 2);
			this.addChildToContainer(colorRightPipeH);

			colorMidPipeV = BaseBitmap.create(lineRes);
			colorMidPipeV.height = colorMidPipeVheight_noWin;
			colorMidPipeV.setPosition(midPipeV.x + midPipeV.width / 2 - colorMidPipeV.width / 2, midPipeV.y + midPipeV.height / 2 - colorMidPipeV.height / 2);
			this.addChildToContainer(colorMidPipeV);

			colorMidPipeH = BaseBitmap.create(lineRes);
			colorMidPipeH.width = 20;
			colorMidPipeH.setPosition(midPipeH.x + midPipeH.height / 2 - colorMidPipeH.width, midPipeH.y - colorMidPipeH.height / 2);
			this.addChildToContainer(colorMidPipeH);

		}
		if (joinInfo.round == this.param.data.nowround) {
			let pkBM = BaseBitmap.create("acbeautyvoteview_battle-" + this.param.data.code);
			pkBM.anchorOffsetX = pkBM.width / 2;
			pkBM.anchorOffsetY = pkBM.height / 2;
			pkBM.setScale(0.5);
			pkBM.setPosition(midPipeV.x + midPipeV.width / 2, midPipeH.y);
			this.addChildToContainer(pkBM)
		}

		if (joinInfo.left) {

			let leftNameTF = ComponentManager.getTextField(LanguageManager.getlocal("acBeautyVoteViewTab1PlayerName" + joinInfo.left + "-" + this.param.data.code), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
			leftNameTF.setPosition(leftBM.x + 58, leftBM.y + 13);
			this.addChildToContainer(leftNameTF);

			let leftItemContainer = new BaseDisplayObjectContainer();
			this.addChildToContainer(leftItemContainer);


			let leftItemBg = BaseBitmap.create("public_9_resbg");
			leftItemBg.setPosition(0, 0);
			leftItemContainer.addChild(leftItemBg);



			let leftitemBM = BaseBitmap.create("acbeautyvoteview_acitemsmall-" + this.param.data.code);
			leftitemBM.anchorOffsetX = leftitemBM.width / 2;
			leftitemBM.anchorOffsetY = leftitemBM.height / 2;
			leftitemBM.setScale(0.8);
			leftitemBM.setPosition(leftItemBg.x + 20, leftItemBg.y + leftItemBg.height / 2);
			leftItemContainer.addChild(leftitemBM);

			let leftItemNumTF = ComponentManager.getTextField(String(joinInfo.leftscore), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
			leftItemNumTF.setPosition(leftitemBM.x + leftitemBM.width / 2 + 5, leftitemBM.y - leftItemNumTF.height / 2);
			leftItemContainer.addChild(leftItemNumTF);
			leftItemContainer.setScale(0.6);
			leftItemContainer.setPosition(leftBM.x + 52, leftBM.y + 30);

		}
		if (joinInfo.right) {
			let rightNameTF = ComponentManager.getTextField(LanguageManager.getlocal("acBeautyVoteViewTab1PlayerName" + joinInfo.right + "-" + this.param.data.code), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
			rightNameTF.setPosition(rightBM.x + 58, rightBM.y + 13);
			this.addChildToContainer(rightNameTF);

			let rightItemContainer = new BaseDisplayObjectContainer();
			this.addChildToContainer(rightItemContainer);



			let rightItemBg = BaseBitmap.create("public_9_resbg");
			rightItemBg.setPosition(0, 0);
			rightItemContainer.addChild(rightItemBg);



			let rightitemBM = BaseBitmap.create("acbeautyvoteview_acitemsmall-" + this.param.data.code);
			rightitemBM.anchorOffsetX = rightitemBM.width / 2;
			rightitemBM.anchorOffsetY = rightitemBM.height / 2;
			rightitemBM.setScale(0.8);
			rightitemBM.setPosition(rightItemBg.x + 20, rightItemBg.y + rightItemBg.height / 2);
			rightItemContainer.addChild(rightitemBM);

			let rightItemNumTF = ComponentManager.getTextField(String(joinInfo.rightscore), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
			rightItemNumTF.setPosition(rightitemBM.x + rightitemBM.width / 2 + 5, rightitemBM.y - rightItemNumTF.height / 2);
			rightItemContainer.addChild(rightItemNumTF);

			rightItemContainer.setScale(0.6);
			rightItemContainer.setPosition(rightBM.x + 52, rightBM.y + 30);
		}
		if (joinInfo.win) {
			let maskBM = BaseBitmap.create("acbeautyvoteview_black");
			maskBM.width = leftBM.width;
			maskBM.height = leftBM.height;
			maskBM.alpha = 0.6;
			this.addChildToContainer(maskBM);

			let failTF = ComponentManager.getTextField(LanguageManager.getlocal("acBeautyVotePlayerBattleInfoPopupViewFail-" + this.param.data.code), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WHITE);
			this.addChildToContainer(failTF);
			if (joinInfo.win == joinInfo.left) {
				maskBM.setPosition(rightBM.x + rightBM.width / 2 - maskBM.width / 2, rightBM.y + rightBM.height / 2 - maskBM.height / 2);
				failTF.setPosition(rightBM.x + rightBM.width / 2 - failTF.width / 2, rightBM.y + rightBM.height / 2 - failTF.height / 2);

			}
			else {
				maskBM.setPosition(leftBM.x + leftBM.width / 2 - maskBM.width / 2, leftBM.y + leftBM.height / 2 - maskBM.height / 2);
				failTF.setPosition(leftBM.x + leftBM.width / 2 - failTF.width / 2, leftBM.y + leftBM.height / 2 - failTF.height / 2);
			}


		}

	}

	/**重设高度 */
	protected resetBgSize() {
		super.resetBgSize();

	}

	protected getResourceList(): string[] {
		return super.getResourceList().concat([
			"skin_detail_namebg",
		]);
	}
	protected getTitleStr(): string {
		return "acBeautyVotePlayerInfoPopupViewTitle-" + this.param.data.code;
	}
	public dispose(): void {
		super.dispose();
	}
}