/*
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
'use strict';





// Create viewer.
var viewer = new Marzipano.Viewer(document.getElementById('pano'));

var autorotate = Marzipano.autorotate({
  yawSpeed: 0.1,         // Yaw rotation speed
  targetPitch: 0,        // Pitch value to converge to
  targetFov: Math.PI/2   // Fov value to converge to
});

// Autorotate will start after 3s of idle time
viewer.setIdleMovement(3000, autorotate);  
// Disable idle movement
// viewer.setIdleMovement(Infinity);

// Start autorotation immediately
// viewer.startMovement(autorotate); 
// Stop any ongoing automatic movement
// viewer.stopMovement();


// Create source.
var source = Marzipano.ImageUrlSource.fromString(
  "https://raw.githubusercontent.com/bijaybogati/360/main/tiles/0-dji_0054-1/{z}/{f}/{y}/{x}.jpg",
  { cubeMapPreviewUrl: "https://raw.githubusercontent.com/bijaybogati/360/main/tiles/0-dji_0054-1/preview.jpg" });

// Create geometry.
var geometry = new Marzipano.CubeGeometry([
    { tileSize: 256, size: 256, fallbackOnly: true },
    { size: 512, tileSize: 512 },
    { size: 1024, tileSize: 512 },
    { size: 2048, tileSize: 512 }
]);

// Create view.
var limiter = Marzipano.RectilinearView.limit.traditional(2048, 120*Math.PI/180);
var view = new Marzipano.RectilinearView(null, limiter);






// Create scene.
var scene = viewer.createScene({
  source: source,
  geometry: geometry,
  view: view,
  pinFirstLevel: true
});



// Display scene.
scene.switchTo({ transitionDuration: 0 });
