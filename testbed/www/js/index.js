"use strict";

/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

var app = {
    // Application Constructor
    initialize: function initialize() {
        this.bindEvents();
    },
    // Bind Event Listeners
    bindEvents: function bindEvents() {
        document.addEventListener("deviceready", this.onDeviceReady, false);
        document.addEventListener("resume", this.onDeviceResume, false);
    },
    // Event Handlers
    onDeviceReady: function onDeviceReady() {
        // Branch
        SetDebug(true);
        InitSession();
    },
    onDeviceResume: function onDeviceResume() {
        // Branch
        SetDebug(true);
        InitSession();
    }
};

app.initialize();

function DeepLinkHandler(data) {
    console.log("DeepLinkHandler InitSession()");

    if (data) {
        alert("Data Link handler response: " + JSON.stringify(data));
    }
}

function NonBranchLinkHandler(data) {
    console.log("Trigger NonBranchLinkHandler()");

    if (data) {
        alert("Non-branch link found: " + JSON.stringify(data));
    }
}

function InitSession() {
    console.log("Trigger InitSession()");

    Branch.setMixpanelToken("<your-mixpanel-token-here>");
    Branch.initSession().then(function (res) {
        console.log(res);
        alert("Response: " + JSON.stringify(res));
    }).catch(function (err) {
        console.error(err);
        alert("Error: " + JSON.stringify(err));
    });
}

function SetDebug(isEnabled) {
    console.log("Trigger SetDebug()");

    Branch.setDebug(isEnabled);
    alert("Debug mode enabled");
}

function CustomAction() {
    console.log("Trigger CustomAction()");

    var action = document.getElementById("custom-action").value;
    var metadata = { "optional": "dictionary" };
    Branch.userCompletedAction(action, metadata).then(function (res) {
        console.log(res);
        alert("Response: " + JSON.stringify(res));
    }).catch(function (err) {
        console.error(err);
        alert("Error: " + JSON.stringify(err));
    });
}

function GetLatestReferringParams() {
    console.log("Trigger GetLatestReferringParams()");

    Branch.getLatestReferringParams().then(function (res) {
        console.log(res);
        alert("Response: " + JSON.stringify(res));
    }).catch(function (err) {
        console.error(err);
        alert("Error: " + JSON.stringify(err));
    });
}

function GetFirstReferringParams() {
    console.log("Trigger GetFirstReferringParams()");

    Branch.getFirstReferringParams().then(function (res) {
        alert("Response: " + JSON.stringify(res));
        console.log(res);
    }).catch(function (err) {
        alert("Error: " + JSON.stringify(err));
        console.error(err);
    });
}

function SetIdentity() {
    console.log("Trigger SetIdentity()");

    var newIdentity = document.getElementById("identity").value;
    Branch.setIdentity(newIdentity).then(function (res) {
        console.log(res);
        alert("Response: " + JSON.stringify(res));
    }).catch(function (err) {
        console.error(err);
        alert("Error: " + JSON.stringify(err));
    });
}

function Logout() {
    console.log("Trigger Logout()");

    Branch.logout().then(function (res) {
        console.log(res);
        alert("Response: " + JSON.stringify(res));
    }).catch(function (err) {
        console.error(err);
        alert("Error: " + JSON.stringify(err));
    });
}

var branchUniversalObj = null;

function CreateBranchUniversalObject() {
    console.log("Trigger CreateBranchUniversalObject()");

    var properties = {
        canonicalIdentifier: "testbed",
        title: "testbed",
        contentDescription: "Testbed Application",
        contentImageUrl: "https://imgflip.com/s/meme/Derp.jpg",
        contentIndexingMode: "public",
        contentMetadata: {}
    };

    Branch.createBranchUniversalObject(properties).then(function (res) {
        console.log(res);
        alert("Response: " + JSON.stringify(res));
        branchUniversalObj = res;
    }).catch(function (err) {
        console.error(err);
        alert("Error: " + JSON.stringify(err));
    });
}

function RegisterView() {
    console.log("Trigger RegisterView()");

    if (branchUniversalObj === null) {
        return alert("need to Generate Branch Universal Object");
    }
    branchUniversalObj.registerView().then(function (res) {
        console.log(res);
        alert("Response: " + JSON.stringify(res));
    }).catch(function (err) {
        console.error(err);
        alert("Error: " + JSON.stringify(err));
    });
}

function GenerateShortUrl() {
    console.log("Trigger GenerateShortUrl()");

    var properties = {
        feature: "test",
        alias: document.getElementById("alias").value,
        channel: "test",
        stage: "test",
        duration: 10000
    };
    var controlParams = {
        $fallback_url: "www.another.com",
        $desktop_url: "www.desktop.com",
        $android_url: "test",
        $ios_url: "ios",
        $ipad_url: "ipad",
        $fire_url: "fire",
        $blackberry_url: "blackberry",
        $windows_phone_url: "win-phone"
    };

    if (branchUniversalObj === null) {
        return alert("need to Generate Branch Universal Object");
    }
    branchUniversalObj.generateShortUrl(properties, controlParams).then(function (res) {
        console.log(res);
        document.getElementById("generated-url").placeholder = "";
        document.getElementById("generated-url").value = res.url;
    }).catch(function (err) {
        console.error(err);
        alert("Error: " + JSON.stringify(err));
    });
}

function ShowShareSheet() {
    console.log("Trigger ShowShareSheet()");

    var properties = {
        feature: "test",
        alias: document.getElementById("alias").value,
        channel: "test",
        stage: "test",
        duration: 10000
    };
    var controlParams = {
        $fallback_url: "www.another.com",
        $desktop_url: "www.desktop.com",
        $android_url: "test",
        $ios_url: "ios",
        $ipad_url: "ipad",
        $fire_url: "fire",
        $blackberry_url: "blackberry",
        $windows_phone_url: "win-phone"
    };

    console.log(branchUniversalObj);

    // Set listeners
    if (branchUniversalObj === null) {
        return alert("need to Generate Branch Universal Object");
    }
    branchUniversalObj.onShareSheetLaunched(function () {
        console.log("Share sheet launched");
    });
    branchUniversalObj.onShareSheetDismissed(function () {
        console.log("Share sheet dismissed");
    });
    branchUniversalObj.onLinkShareResponse(function (res) {
        console.log("Share link response: " + JSON.stringify(res));
    });
    branchUniversalObj.onChannelSelected(function (res) {
        console.log("Channel selected: " + JSON.stringify(res));
    });

    branchUniversalObj.showShareSheet(properties, controlParams, "Custom Text");
}

function ListOnSpotlight() {
    console.log("Trigger ListOnSpotlight()");

    if (branchUniversalObj === null) {
        return alert("need to Generate Branch Universal Object");
    }
    branchUniversalObj.listOnSpotlight().then(function (res) {
        console.log(res);
        alert("Response: " + JSON.stringify(res));
    }).catch(function (err) {
        console.error(err);
        alert("Error: " + JSON.stringify(err));
    });
}

function LoadRewards() {
    console.log("Trigger LoadRewards()");

    Branch.loadRewards().then(function (res) {
        console.log(res);
        alert("Response: " + JSON.stringify(res));
    }).catch(function (err) {
        console.error(err);
        alert("Error: " + JSON.stringify(err));
    });
}

function RedeemRewards() {
    console.log("Trigger RedeemRewards()");

    var reward = 1000;
    Branch.redeemRewards(reward).then(function (res) {
        console.log(res);
        alert("Response: " + JSON.stringify(res));
    }).catch(function (err) {
        console.error(err);
        alert("Error: " + JSON.stringify(err));
    });
}

function CreditHistory() {
    console.log("Trigger CreditHistory()");

    Branch.creditHistory().then(function (res) {
        console.log(res);
        alert("Response: " + JSON.stringify(res));
    }).catch(function (err) {
        console.error(err);
        alert("Error: " + JSON.stringify(err));
    });
}