<template>
    <card class="card" title="اعلان های ادمین" sub-title="در این بخش شما میتوانید اعلان جدید بسازید و سایر اعلان ها را ببینید.">
        <div>
            <form>
                <div class="row">
                    <div class="col-md-4">
                        <fg-input type="text"
                                  label="عنوان"
                                  placeholder="عنوان">
                        </fg-input>
                    </div>
                    <div class="col-md-4">
                        <multi-select
                                label="انتخاب اعضا"></multi-select>
                    </div>
                    <div class="col-md-4">
                        <multi-select
                                label="انتخاب شرکت"></multi-select>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-12">
                        <div class="form-group">
                            <label>توضیحات</label>
                            <textarea rows="5" class="form-control border-input"
                                      placeholder="توضیحات:">

              </textarea>
                        </div>
                    </div>
                </div>
                <div class="text-center">
                    <p-button type="info"
                              round>
                        ایجاد
                    </p-button>
                </div>
                <div class="clearfix"></div>
            </form>
        </div>
    </card>
</template>
<script>
</script>
<style scoped>

</style>