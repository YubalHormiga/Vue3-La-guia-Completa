
<template  >
    <div class="spinner">
        <span class="loader"></span>
    </div>
</template>
<style >
.spinner {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
   /* Ajusta esto según tus necesidades */
}

.loader {
  width: 58px;
  height: 58px;
  border-radius: 50%;
  display: inline-block;
  position: relative;
  border: 4px solid #1b2139;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;
}
.loader::after {
  content: '';  
  box-sizing: border-box;
  position: absolute;
  left: 4px;
  top: 4px;
  border: 3px solid #61ecbc;
  width: 12px;
  height: 12px;
  border-radius: 50%;
}
    
@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
} 
</style>
