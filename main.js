"use strict;"

function FormDescriptor() {
	this.formsLoaded = [];
	this.formsToLoad = ['basic_info'];
	this.pageDescriptors = [];
	this.validate = function () {
		for (var f in this.pageDescriptors) {
			if (this.pageDescriptors[f].validate && 
				!this.pageDescriptors[f].validate()) {
				$( '#validate_info' ).html(
						this.pageDescriptors[f].validateInfo
				)
				$( '#validate_info' ).show(500);
				return false;
			} else {
				$( '#validate_info' ).hide(500);
			}
		}
		$( '#validate_info' ).html("")
		return true;
	};

	this.getPath = function (name) {
		return name + '.html';
	};

	this.addNewForm = function (forms) {
		for (i in forms) {
			if (!(this.formsLoaded.includes(forms[i])) && 
				!(this.formsToLoad.includes(forms[i]))) {
				this.formsToLoad.push(forms[i]);
			}
		}
	}

	this.loadNext = function () {
		if (!this.validate()) {
			return false;
		}

		for (var f in this.pageDescriptors) {
			if (this.pageDescriptors[f].getRequires) {
				this.addNewForm(
					this.pageDescriptors[f].getRequires());
			}
		}

		if (this.formsToLoad.length == 0) {
			console.log("All loaded");
			return false;
		}
		var name = this.formsToLoad.pop();
		var pathName = this.getPath(name);
		console.log("Loading " + pathName);
		this.formsLoaded.push(name);
		var elementId = name + '_outer';
		$( '<div />', {
			id: elementId
		}).appendTo( '#main_form' );
		$( '#' + elementId ).load(pathName);
		/*
		$.get("page.html", function(data) {
			var data = $(data);
			$("#div").html(data);
		});
		*/
		return true;
	};
}
