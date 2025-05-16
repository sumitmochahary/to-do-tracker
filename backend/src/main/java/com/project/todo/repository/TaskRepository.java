package com.project.todo.repository;

import com.project.todo.domain.Task;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface TaskRepository extends MongoRepository<Task, Integer> {

        List<Task> findByUserId(String userId);

        List<Task> findByTaskCategory(String taskCategory);

        List<Task> findByTaskStatus(String taskStatus);  // ✅ Already covers fetching 'completed', 'archived', etc.

        List<Task> findByTaskDueDate(LocalDate taskDueDate);

        Optional<Task> findByTaskId(int taskId);

        // Custom query to get tasks that are NOT 'archived' (fetch active tasks only)
        List<Task> findByTaskStatusNot(String status);
}

