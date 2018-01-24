_dcq.push(["identify", {
    email: "johnBEE@acme.com",
    first_name: "John",
    tags: ["Customer"],
    success: function(response) {
      console.log(response)
      // Call a method with the response object
      // Success callback is optional
    }
  }]);