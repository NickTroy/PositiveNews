# Load the Rails application.
require_relative 'application'

Rails.application.configure do
  config.action_dispatch.default_headers = {
    'X-Frame-Options' => 'ALLOWALL'
  }
end
# Initialize the Rails application.
Rails.application.initialize!
