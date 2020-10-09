export function LinkTo(nextPath, type) {  
  if (this.$route.path != nextPath) {
    if( type == "replace" ){
      this.$router.replace(nextPath);
    }else {
      this.$router.push(nextPath);
    }
  }
}