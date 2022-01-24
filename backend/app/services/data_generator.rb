class DataGenerator

  def self.call
    start_date = DateTime.now - 2.days
    end_date = start_date + 3.days
    
    (start_date..end_date).each do |day|
      (0..23).each do |hour|
        (0..59).each do |min|
          date_time = DateTime.new(day.year, day.month, day.day, hour, min, 0)
          Event.create!(created_at: date_time , name: 'ola', value: rand(0..100))
        end
      end
    end
  end

end